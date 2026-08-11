Feature: Login flow

  Scenario Outline: Login with different credentials
      Given User opens the "login" page
      When User logs in with "<credentials>" credentials
      Then Notification message should contain "<message>"

  Examples:
  | credentials | message |
  | valid       | Signed in successfully |
  | invalid     | An error occurred while connecting to server: You do not have enough permissions. Bad credentials |
