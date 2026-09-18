import { CypressLoginPage } from '../../src/business/pages/cypress/loginPage';
import { CypressLaunchesPage } from '../../src/business/pages/cypress/launchesPage';
import { PageLaunchResponse } from '../../src/api/models/launchResponses';
import { convertToTimestamps, getLaunchStatistics, getSortedStartTimes } from '../../src/core/utils/launchesUtils';
import { StringUtils } from '../../src/core/utils/stringUtils';
import { CypressJsExecutor } from '../../src/core/ui/cypress/CypressJsExecutor';
import { DateUtils } from '../../src/core/utils/dateUtils';
import { CreateLaunchRequest } from 'src/api/models/launchRequests';
import { CypressTestExecutionPage } from 'src/business/pages/cypress/testExecutionPage';

describe('ReportPortal Launches sorting', () => {
    const loginPage = new CypressLoginPage();
    const launchesPage = new CypressLaunchesPage();
    const testExecutionPage = new CypressTestExecutionPage();

    const jsExecutor = new CypressJsExecutor();

    beforeEach(() => {
        loginPage.open();
        loginPage.login();
        launchesPage.open();
    });

    it('Should display launches sorted by start time in descending order by default', () => {
        cy.task('getLaunches').then((response) => {
            const launchesResponse = response as PageLaunchResponse;
            const expectedDescending = getSortedStartTimes(launchesResponse, true);
            void launchesPage.getLaunchStartTimes().then((startTimes) => {
                const actualDescending = convertToTimestamps(startTimes);
                expect(actualDescending).to.deep.equal(expectedDescending);
            });
        });
    });

    it('Should sort launches by start time in ascending order', () => {
        launchesPage.sortByStartTime();
        cy.task('getLaunches').then((response) => {
            const launchesResponse = response as PageLaunchResponse;
            const expectedAscending = getSortedStartTimes(launchesResponse, false);
            void launchesPage.getLaunchStartTimes().then((startTimes) => {
                const actualAscending = convertToTimestamps(startTimes);
                expect(actualAscending).to.deep.equal(expectedAscending);
            });
        });
    });

    it('Should display correct statistics for each launch', () => {
        cy.task('getLaunches').then((response) => {
            const launchesResponse = response as PageLaunchResponse;

            launchesResponse.content.forEach((launch, index) => {
                const launchIndex = index + 1;
                const statistics = getLaunchStatistics(launch);

                statistics
                    .filter(({ value }) => value !== undefined)
                    .forEach(({ column, value, type }) => {
                        const statistic =
                            type === 'execution'
                                ? launchesPage.getExecutionStatisticByIndex(
                                    launchIndex,
                                    column,
                                )
                                : launchesPage.getDefectStatisticByIndex(
                                    launchIndex,
                                    column,
                                );

                        void statistic.textContent().then((actualValue) => {
                            expect(
                                Number(actualValue),
                                `Launch #${launch.number} ${column}`,
                            ).to.equal(value);
                        });
                    });
            });
        });
    });

    it('Should be able to compare launches', () => {
        const LAUNCHES_TO_COMPARE = 2;
        for (let i = 1; i <= LAUNCHES_TO_COMPARE; i++) {
            jsExecutor.click(launchesPage.getCheckIconLocatorByIndex(i).getSelector());
        }

        jsExecutor.click(launchesPage.actionsButton.getSelector());
        jsExecutor.click(launchesPage.getMenuItemByText('Compare').getSelector());

        const compareLaunchesModal = launchesPage.getCompareLaunchesModal();
        void compareLaunchesModal.isVisible().then((isVisible) => {
            expect(isVisible).to.equal(true);
        });

        jsExecutor.click(launchesPage.getButtonByText('Cancel').getSelector());
        cy.get(compareLaunchesModal.getSelector()).should('not.exist');
    });

    it('Should be able to delete launch', () => {
        const launchName = `Cypress delete launch ${Date.now()}`;

        cy.task('createAndFinishLaunch', launchName).then(() => {
            launchesPage.open();
            launchesPage.selectLaunchByName(launchName);
            jsExecutor.click(launchesPage.actionsButton.getSelector());
            jsExecutor.click(launchesPage.getMenuItemByText('Delete').getSelector());
            jsExecutor.click(launchesPage.getButtonByText('Delete').getSelector());

            void launchesPage
                .getLaunchByName(launchName)
                .isVisible()
                .then((isVisible) => {
                    expect(isVisible).to.equal(false);
                });
        });
    });

    it('Should be able to move to appropriate launch view clicking on Launch name', () => {
        const launchName = `Cypress delete launch ${Date.now()}`;
        cy.task('createAndFinishLaunch', launchName).then(() => {
            void launchesPage
                .getLaunchNameByIndex(1)
                .textContent()
                .then((firstLaunchName) => {
                    launchesPage.openLaunchByIndex(1);
                    void launchesPage
                        .getLastBreadcrumbText()
                        .then((lastBreadcrumbText) => {
                            expect(
                                StringUtils.removeWhitespace(lastBreadcrumbText ?? ''),
                            ).to.equal(
                                StringUtils.removeWhitespace(firstLaunchName ?? ''),
                            );
                        });
                });
        });
    });

    it('Should display exact launch start time on hover', () => {
        const launchName = `Cypress delete launch ${Date.now()}`;
        cy.task('createAndFinishLaunch', launchName).then((createdLaunch) => {
            const createdLaunchResponse = createdLaunch as CreateLaunchRequest;
            const expectedStartTime = DateUtils.normalizeToSeconds(
                DateUtils.convertToTimestamp(createdLaunchResponse.startTime),
            );

            const launch = launchesPage.getLaunchNameByIndex(1);
            const selector = launch.getSelector();
            jsExecutor.hover(selector);

            void launch.textContent().then((actualStartTime) => {
                const actualTimestamp = DateUtils.convertToTimestamp(actualStartTime ?? '');
                expect(actualTimestamp).to.equal(expectedStartTime);
            });
        });
    });

    it('Should resize launch element', () => {
        const launch = launchesPage.getLaunchLocatorByIndex(1);
        const selector = launch.getSelector();

        const newWidth = 500;
        const newHeight = 100;

        jsExecutor.resize(selector, newWidth, newHeight);
        cy.get(selector).then(($element) => {
            expect($element[0].style.width).to.equal(`${newWidth}px`);
            expect($element[0].style.height).to.equal(`${newHeight}px`);
        });
    });

    it('Should be able to reorder columns using drag and drop', () => {
        testExecutionPage.open();
        testExecutionPage.getCustomizeColumnsButton().click();
        void testExecutionPage.getColumnNameByIndex(1).textContent().then((firstColumn) => {
            const source = testExecutionPage.getDragControlByIndex(2);
            const target = testExecutionPage.getDragControlByIndex(1);

            jsExecutor.dragAndDrop(
                source.getSelector(),
                target.getSelector(),
            );

            void testExecutionPage.getColumnNameByIndex(1).textContent().then((newFirstColumn) => {
                expect(newFirstColumn).to.not.equal(firstColumn);
            });
        });
    });

    it('Should intercept launches request and verify response', () => {
        cy.intercept('GET', '**/launch*').as('getLaunches');

        launchesPage.open();
        cy.wait('@getLaunches').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
            const response = interception.response?.body as PageLaunchResponse;
            expect(response.content).to.be.an('array');
            response.content.forEach((launch) => {
                expect(launch.id).to.be.a('number');
                expect(launch.name).to.be.a('string');
                expect(launch.startTime).to.be.a('string');
            });
        });
    });
});
