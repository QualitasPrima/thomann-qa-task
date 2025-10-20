# 🎵 Thomann QA Automation Project — “CableGuy Journey” (E2E with Playwright)

> **Note:** This project was completed as a home assignment for the **Senior Software Quality Engineer** role at **Thomann.io**.

---

## 🚀 Project Objective

The goal of this project is to demonstrate a **scalable, modular, and maintainable QA automation framework** using **Playwright with TypeScript**, covering the full **user journey on Thomann’s “CableGuy” tool** — from selecting a cable configuration to verifying the shopping basket.

This project fulfills all acceptance criteria for the assignment:

1. ✅ **Automated E2E flow** using Playwright  
2. ✅ **Data-driven, modular TypeScript implementation**  
3. ✅ **Reusable and maintainable architecture**  
4. ✅ **Automatic test reporting after execution**

---

## 🎯 Test Scenario Overview

**Primary E2E Test Flow:**
> CableGuy → Product → Basket

1. Accept cookies upon feature landing page (Cable Guy)
2. Select a cable beginning and end plug combination
3. Selet a manufacturer
4. Verify that product results appear and pick a random item
5. Validate product details (title, price, quantity)  
6. Add item to basket  
7. Verify basket page, toast popup notification, and price/quantity consistency  

Each run uses a different random combination, ensuring **test variety** and **data-driven robustness** 🎛️.

---

## ✨ Key Concepts Demonstrated

### 🎸 Test Design & Architecture

- Built using **Page Object Model (POM)** - clear separation of logic, selectors, and validations.
- **Data-driven testing** via `cableGuyData.json`.
- **Reusable helpers** for logging, UI interactions, and randomization.

### 🧱 Code Reusability & Modularity

- Common logic extracted into:
  
  - `helpers/uiHelpers.ts` → Shared UI utilities 
  - `utils/config.ts` → Centralized constants (timeouts, base URL)  
  - `utils/logger.ts` → Unified step logging
  - `utils/randomTestUtils.ts` → Random data utilities

### 🎧 Readability & Maintainability

- Clean, readable syntax:
  
  ```ts
  await cableGuy.selectCableAtRandom("BNC male", "BNC female");
  await cableGuy.selectManufacturerAtRandom("Sennheiser");
  await productPage.addToBasket();
  await basket.verifyToast("Sennheiser AM 2");

---

## 🛠️ Tech Stack & Tools

| Category              | Tools Used               |
| --------------------- | ------------------------ |
| Automation Framework  | Playwright + TypeScript  |
| Source Control        | Git & GitHub             |
| Runtime               |  Node.js (via npm)       |
| CI/CD                 | GitHub Actions           |
| IDE / Editor          | Visual Studio Code       |
| Formatter             | Prettier                 |
| Reporting             | Playwright HTML Reporter |
| Documentation         | Markdown (`.md` files)   |

---

## 📂 Project Structure

```text
📂 thomann-qa-task/
├── 📁 .github/
│ └── 📁 workflows/
│ └── playwright.yml # CI pipeline for GitHub Actions
│
├── 📁 data/
│ └── cableGuyData.json # Test data for cable types and brands
│
├── 📁 helpers/
│ ├── dataHelper.ts # Randomized cable & brand selection
│ └── uiHelpers.ts # Shared UI utility functions
│
├── 📁 pages/
│ ├── BasketPage.ts # Basket verification logic
│ ├── CableGuyPage.ts # Main product builder page
│ └── ProductPage.ts # Product page validation
│
├── 📁 tests/
│ └── thomann-cable-builder.spec.ts # Main E2E test scenario
│
├── 📁 utils/
│ ├── config.ts # Timeouts & base URL constants
│ ├── logger.ts # Central logging helpers
│ └── randomTestUtils.ts # Randomization utilities
│
├── 📄 .gitignore # Ignored files (node_modules, reports, etc.)
├── 📄 package-lock.json
├── 📄 package.json # npm scripts & dependencies
├── 📄 playwright.config.ts # Playwright test runner config
├── 📄 README.md # Project documentation and guide 🎶
└── 📄 tsconfig.json # TypeScript configuration
```
---

## ⚙️ Setup & Execution

### ✅ Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS version)
- [Git](https://git-scm.com/downloads)
- [Playwright CLI](https://playwright.dev/docs/test-cli)

---

### 📦 Install & Run

**Clone the repository**

`git clone https://github.com/QualitasPrima/thomann-qa-task.git`

**Navigate into the directory**

`cd thomann-qa-task`

**Install Node.js dependencies**

`npm install`

**Install Playwright browsers (once)**

`npx playwright install`

---

### ▶️ Run Tests

**Run tests in UI mode (visual)**

`npx playwright test --ui`

**Run tests headlessly (CLI)**

`npx playwright test`

**Open the HTML test report**

`npx playwright show-report`

---

### 📊 Test Reporting

After running tests, an HTML report is automatically generated under the following path:

`playwright-report/index.html`

You can view it by running the script defined in your package.json:

`npm run report`

---

### 💬 Logger Output Example

Below is an example of the console logger output generated during a test run:

> 📸 [Logger Screenshot](./assets/logger-example.png)

The logger provides clear visual cues:

- 🧩 indicates a logical step in progress

- ✅ confirms successful validation

- ❌ highlights errors

- ℹ️ provides informational context

This style promotes human-readable test execution even without needing or opening HTML report.

---

### 🤖 Continuous Integration (CI)

This project includes a **GitHub Actions workflow** located in the following path:

`.github/workflows/playwright.yml`

By default, tests run automatically on:

* **Every push or pull request** to `main` or `master`.
* Artifacts (HTML reports) are uploaded and retained for **30 days**.

---

## 🎼 Future Enhancements / Next Steps

Although this project fulfills the core assignment, here are the next logical extensions I would pursue as QA Engineer:

### 🧩 Test Suite Expansion

- Negative & Edge Case Coverage

- Attempt basket removal → verify empty state

- Validate free shipping threshold (0 € delivery)

- Multi-quantity and mixed-brand basket totals

- Currency consistency across pages

- Regression & Smoke Suites

- Split tests into smaller, category-based specs for faster CI cycles

### 📊 Reporting Enhancements

- Integrate Allure Reporter for advanced analytics

- Capture screenshots and traces automatically on failure

- Store reports as build artifacts in CI/CD pipelines

### 🌍 Scalability & Configurability

- Add environment variables for URLs, timeouts, and browser options

- Introduce Playwright “projects” to test multiple locales/devices

- Parametrize data-driven runs via CLI flags or CI variables

---

## 🪩 Summary

This project exemplifies:

🎯 Strong QA architecture

🧱 Clean modular TypeScript design

🔁 Reusable Page Object Model

📊 Data-driven testing

⚙️ Automated reporting

🎸 Readability, maintainability, and future scalability

It not only meets the given acceptance criteria but also demonstrates forward-thinking test design aligned with modern QA engineering best practices.

---

## ⚖️ License

This project is licensed under the MIT License.

---

## 🧑‍💻 Author

Qualitas Prima
QA Engineer & Test Automation Specialist
> 🧠 Ensuring quality through clean, deterministic automation.



