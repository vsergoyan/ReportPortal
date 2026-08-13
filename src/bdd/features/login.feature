Feature: Login flow

  Scenario Outline: Login with different credentials
      Given User opens the "login" page
      When User logs in with "<credentials>" credentials
      Then Notification message should contain "<message>"

  Examples:
  | credentials | message |
  | valid       | successfullLogin |
  | invalid     | badCredentials   |
