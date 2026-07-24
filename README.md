This project demonstrates the implementation of a layered Test Automation Framework using Playwright. The primary goal is to provide a maintainable and extensible architecture rather than a complete test suite.

# ReportPortal Test Automation Framework

A lightweight Test Automation Framework built with **Playwright** for UI testing of **ReportPortal**.

The framework was created as part of the EPAM Automation Mentoring Program and demonstrates a clean layered architecture with reusable components.

---

# Technology Stack

- Playwright
- TypeScript
- ReportPortal
- Winston Logger
- dotenv
- Minikube
- Kubernetes
- Helm

---

# Project Structure

```
src
├── business
│   └── pages
│       ├── BasePage.ts
│       ├── LoginPage.ts
│       └── index.ts
│
├── core
│   ├── config
│   ├── logger
│   └── utils
│
├── fixtures
│   ├── test.fixture.ts
│   └── index.ts
│
└── tests
    └── simple.spec.ts
```

---

# Framework Layers

## Core

Contains reusable framework components:

- Configuration
- Logger
- Utilities

## Business

Contains business logic and Page Objects.

Current implementation:

- BasePage
- LoginPage

## Tests

Contains Playwright test specifications.

---

# Features

- Layered architecture
- Page Object Model
- Configuration management
- Winston logging
- ReportPortal integration
- Local and remote environment support
- Playwright fixtures
- Cross-browser support

---

# Configuration

The framework supports multiple environments.

```
.env.local
.env.web
```

Environment is selected using:

```
TEST_ENV=local
```

or

```
TEST_ENV=web
```

---

# Running Tests

## Chromium

```bash
npm run test:chrome
```

## Local ReportPortal

```bash
npm run test:local
```

## Web ReportPortal

```bash
npm run test:web
```

## Local (headed)

```bash
npm run test:local:headed
```

## Web (headed)

```bash
npm run test:web:headed
```

## All browsers

```bash
npm run test
```

---

# ReportPortal

Tests are automatically reported to ReportPortal.

Local ReportPortal:

```
http://localhost:8080/ui/
```

---

# Logging

The framework uses **Winston**.

Logs are written to:

```
reports/framework.log
```

---

# Design Principles

The framework is designed to be modular and easily extendable.

Current abstractions include:

- Logger interface
- Logger factory
- Configuration service
- Utility classes
- Base page object
- Playwright fixtures

This allows framework components to be replaced with minimal impact on the rest of the project.

---

# Future Improvements

- API testing layer
- Business workflows
- Data models
- CI/CD pipeline
- Parallel execution improvements
- Docker support
