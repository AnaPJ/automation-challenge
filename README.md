# Cypress End-to-End Tests

This folder contains end-to-end and UI tests for the [automation-challenge](https://github.com/AnaPJ/automation-challenge) project, built using [Cypress](https://www.cypress.io/).

## Folder Structure

- **e2e/**  
  Contains the test specifications for your application's features and flows.

- **fixtures/**  
  Stores mock data and test data in JSON or other formats used during test execution.

- **pages/**  
  (If present) Implements the Page Object Model pattern for organizing selectors and reusable page-related functions.

- **support/**  
  Contains custom commands, reusable functions, and global setup/configuration for Cypress tests.

## Getting Started

### Installation

Make sure you have Node.js installed. Then, in the root of your repository, run:

```bash
npm install
```

### Running Tests

You can run Cypress tests in interactive mode:

```bash
npx cypress open
```

Or run them in headless mode:

```bash
npx cypress run
```

## Custom Commands & Page Objects

- Place reusable commands in `cypress/support/commands.js`.
- Define page objects in `cypress/pages/` for better maintainability.

## Adding Tests

Create new test files inside the `cypress/e2e/` directory. Test data can be placed in `cypress/fixtures/`.

## AT Strategy Doc

To see the details about the AT strategy defined for this project, follow this link (Use the Huge account for access): https://docs.google.com/document/d/1OSPizNDCFjsy0Ffs6SovDEc3STihtNmvwLECiAoLMZw/edit?pli=1&tab=t.8fizdrrqpggo
