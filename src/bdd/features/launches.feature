Feature: Launches

Rule: Authenticated users can manage launches

  Background:
      Given User opens the "login" page
      When User logs in with "valid" credentials
      Then Notification message should contain "successfullLogin"
      And User opens the "launches" page

  Scenario: Compare launches
    When User selects launches:
      | 1 |
      | 2 |
    And User clicks the "Launches page > Actions button"
    And User clicks the "Launches page > Compare menu item"
    Then "Launches page > Compare Launches modal" should be visible
    But "Launches page > Delete Launch modal" should not be visible
    And User clicks the "Launches page > Compare Launches modal > Cancel button"
    Then "Launches page > Compare Launches modal" should not be visible
  
  Scenario: Open launch by clicking on name
    When User remembers the "1" launch name as "targetLaunchName"
    And User clicks launch name number 1
    Then Last breadcrumb should contain remembered "targetLaunchName"

  Scenario: Delete launch
    When User remembers the "last" launch name as "lastLaunchName"
    And User selects launches:
      | last |
    And User clicks the "Launches page > Actions button"
    And User clicks the "Launches page > Delete menu item"
    Then "Launches page > Delete Launch modal" should be visible
    And User clicks the "Launches page > Delete Launch modal > Delete button"
    Then Launch list should not contain remembered "lastLaunchName"
