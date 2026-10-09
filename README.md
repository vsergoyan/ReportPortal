# ReportPortal Test Automation Framework

A scalable Test Automation Framework built with **Playwright** and **TypeScript** for automated testing of **ReportPortal**.

The framework was developed as part of the **EPAM Automation Mentoring Program** and demonstrates a layered architecture, reusable automation components, CI/CD integration, test reporting, logging, and integration with external test management and communication tools.

---

## Technology Stack

- **TypeScript**
- **Playwright**
- **Cypress**
- **Mocha**
- **Cucumber / BDD**
- **Axios**
- **ReportPortal**
- **Winston**
- **Jenkins**
- **SonarQube**
- **Jira**
- **Microsoft Teams**
- **dotenv**

---

## Project Structure

```text
src/
├── api/
│   ├── clients/
│   └── ...
│
├── business/
│   ├── components/
│   ├── pages/
│   └── constants/
│
├── core/
│   ├── config/
│   ├── logger/
│   └── utils/
│
├── fixtures/
│   └── test.fixture.ts
│
├── integrations/
│   ├── jira/
│   └── teams/
│
└── tests/
    ├── api/
    ├── bdd/
    ├── cypress/
    ├── mocha/
    └── playwright/

ci/
└── Jenkinsfile
```

---

## Framework Architecture

The framework follows a layered architecture that separates test logic, business logic, framework utilities, and external integrations.

### Core

Contains reusable framework functionality:

- Configuration management
- Logging
- Utility classes
- Common framework services

### Business

Contains application-specific functionality:

- Page Objects
- Reusable UI components
- Business constants
- Application interactions

### Fixtures

Provides reusable Playwright fixtures and test setup.

### Tests

Contains automated tests implemented using different testing approaches:

- Playwright UI tests
- API tests
- Cypress tests
- Mocha tests
- Cucumber / BDD tests

### Integrations

Contains integrations with external systems:

- Jira
- Microsoft Teams
- ReportPortal

### CI

Contains the Jenkins Pipeline as Code configuration.

---

## Features

- Layered Test Automation Framework architecture
- Page Object Model
- Reusable UI components
- Playwright fixtures
- Cross-browser testing
- UI automation with Playwright
- API automation
- Cypress automation
- Mocha support
- Cucumber / BDD support
- Environment-based configuration
- Winston framework logging
- ReportPortal test reporting
- ReportPortal log levels and filtering
- Jira test case status updates
- Microsoft Teams test execution notifications
- Jenkins CI/CD pipeline
- SonarQube code quality analysis
- SonarQube Quality Gate
- JUnit test result publishing
- Parallel test execution support

---

## Configuration

The framework supports different environments through environment-specific configuration files.

```text
.env.local
.env.web
```

The environment can be selected using:

```bash
TEST_ENV=local
```

or:

```bash
TEST_ENV=web
```

Sensitive configuration such as API keys, credentials, Jira tokens, and Teams webhooks is stored in environment variables and is not committed to the repository.

---

## Running Tests

### Playwright

Run all Playwright tests:

```bash
npm test
```

Run Chromium:

```bash
npm run test:chrome
```

Run Firefox:

```bash
npm run test:firefox
```

Run WebKit:

```bash
npm run test:webkit
```

Run tests in headed mode:

```bash
npm run test:headed
```

### Local Environment

Run tests against the local environment:

```bash
npm run test:local
```

Run in headed mode:

```bash
npm run test:local:headed
```

### Web Environment

Run tests against the web environment:

```bash
npm run test:web
```

Run in headed mode:

```bash
npm run test:web:headed
```

### API Tests

Using the Playwright API client:

```bash
npm run test:api:playwright
```

Using Axios:

```bash
npm run test:api:axios
```

### Mocha

Run Mocha tests:

```bash
npm run test:mocha:web
```

Run tests in parallel:

```bash
npm run test:mocha:parallel
```

### BDD

Run Cucumber / BDD tests:

```bash
npm run test:bdd:web
```

Run only scenarios tagged with `@only`:

```bash
npm run test:bdd:web:only
```

Run BDD tests in parallel:

```bash
npm run test:bdd:parallel
```

### Cypress

Run Cypress tests:

```bash
npm run test:cypress
```

Run Cypress in headed/debug mode:

```bash
npm run test:cypress:debug
```

---

## ReportPortal

The framework integrates Playwright tests with **ReportPortal**.

Each test execution creates a ReportPortal launch containing:

- Test execution results
- Test steps
- Framework logs
- Test attributes
- Failure information

Logs are reported with different levels:

- DEBUG
- INFO
- WARN
- ERROR

This allows logs to be filtered by level in the ReportPortal UI.

Jenkins executions are identified in ReportPortal using the Jenkins build number.

Example:

```text
Jenkins #17 - Playwright (web)
```

---

## Logging

The framework uses **Winston** through a custom `ILogger` abstraction.

The logging architecture is:

```text
Application / Page Objects
          |
          v
       ILogger
          |
          v
    WinstonLogger
       /      \
      /        \
 Console       File
                |
                v
          ReportPortal
```

Framework logs are stored in:

```text
reports/framework.log
```

The logger supports:

```text
DEBUG
INFO
WARN
ERROR
```

Logs are also reported to ReportPortal with their corresponding levels.

---

## Jira Integration

The framework integrates with **Jira** to update automated test case statuses.

UI tests can be associated with Jira test cases using Jira annotations.

After test execution, the corresponding Jira test case is updated based on the automation result:

```text
Passed
```

or:

```text
Failed
```

This connects automated test execution with test management.

---

## Microsoft Teams Integration

The framework integrates with **Microsoft Teams** to provide test execution notifications.

Notifications are sent when the test run:

- Starts
- Finishes

This provides visibility into automation execution without requiring users to open Jenkins or ReportPortal.

---

## CI/CD

The framework uses **Jenkins Pipeline as Code**.

The pipeline configuration is stored in:

```text
ci/Jenkinsfile
```

The Jenkins pipeline performs the following stages:

1. Checkout
2. Dependency installation
3. Project build
4. Automated test execution
5. ReportPortal reporting
6. Jira status updates
7. Microsoft Teams notifications
8. JUnit test result publishing
9. SonarQube analysis
10. SonarQube Quality Gate validation

The Jenkins pipeline executes the same automation project that can be run locally.

---

## Code Quality

**SonarQube** is integrated into the CI pipeline.

After the automated tests are executed, the project is analyzed by SonarQube and the configured Quality Gate is evaluated.

The pipeline can fail when the Quality Gate requirements are not met.

---

## Git Workflow

The project uses feature branches for development.

Changes are developed on dedicated branches and integrated into the main branch through pull requests.

The project also demonstrates Git history management, including moving accidentally merged changes from the `main` branch to a dedicated feature branch without losing the work.

---

## Design Principles

The framework is designed around the following principles:

- Separation of concerns
- Reusability
- Maintainability
- Extensibility
- Environment-based configuration
- Clear separation between framework and business logic
- Reusable abstractions
- Integration with external testing and development tools

The use of interfaces and service abstractions allows framework implementations to be changed with minimal impact on the rest of the project.

---

## Future Improvements

Possible future improvements include:

- Sauce Labs integration
- Additional API test coverage
- Expanded business workflows
- Test data management
- Improved retry handling
- Advanced test parallelization
- Docker-based execution
- Expanded CI/CD reporting
- Additional monitoring and notifications

---

## Project Goal

The main goal of the project is to demonstrate how a modern Test Automation Framework can combine:

```text
UI Automation
      +
API Automation
      +
Reusable Framework Architecture
      +
CI/CD
      +
Code Quality
      +
Test Management
      +
Reporting
      +
Logging
      +
Notifications
```

into a single maintainable automation solution.
