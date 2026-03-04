# Playwright API Automation Framework (JavaScript)

A lightweight **API test automation framework** built on **Playwright Test** using the `request` fixture to validate REST-like HTTP flows (GET/POST), plus a small utilities layer and data-driven test inputs.

This repo currently targets the **CloudBerry Store** demo site endpoints (e.g., login, cart, checkout). :contentReference[oaicite:0]{index=0}

---

## Why this repo exists

This project is a **portfolio/demo framework** showing how to:
- Use **Playwright Test for API automation** (no browser required)
- Drive tests with **external JSON test data**
- Validate real workflows (login → add to cart → checkout) with clean, repeatable test code
- Produce **Playwright HTML reports**, screenshots/videos/traces on failure

---

## Tech stack

- **Node.js + JavaScript (CommonJS)**
- **@playwright/test** runner + `request` fixture :contentReference[oaicite:1]{index=1}
- **Playwright HTML reporter** :contentReference[oaicite:2]{index=2}

---

## Project structure

```text
Api-automation-framework-playwright/
├─ tests/
│  ├─ test-data/
│  │  └─ CloydBerryStoreTestData.json
│  ├─ TC02_Login_API.spec.js
│  ├─ TC03_AddToCart_API.spec.js
│  ├─ TC03_AddToCart_Hybrid.spec.js
│  ├─ TC04_CompletePurchase_API.spec.js
│  ├─ TC05_AddToWishList_API.spec.js
│  └─ TC06_AddAffiliat_API.spec.js
├─ utils/
│  └─ Utils.js
├─ playwright.config.js
├─ package.json
└─ package-lock.json
```

(Your tests folder already includes both pure API flows and a “hybrid” example.)

Quick start
1) Install
npm install

Dependencies are defined in package.json.

2) Run all tests
npx playwright test
3) Run a single test file
npx playwright test tests/TC02_Login_API.spec.js
4) View the HTML report
npx playwright show-report
Configuration

Playwright is configured to:

use ./tests as the test directory

use the HTML reporter

capture screenshots/videos/traces on failure

run against Chromium (headful in the current config)

set a 5s test + expect timeout

Note: playwright.config.js currently contains both an export default defineConfig(...) section and a module.exports = config export. If you run into config/module errors, simplify it to either pure CommonJS or pure ESM.

What the tests cover (high level)
Login token extraction + login POST

The login test demonstrates:

GET the login page

parse a login_token from HTML

POST credentials using Playwright request.post with form data + headers

Add to cart (API)

The add-to-cart test demonstrates:

generate a delivery date string via Utils

POST add-to-cart with form fields

GET the cart page and validate content

Complete purchase (API)

The checkout flow test validates an end-to-end purchase and confirms the success message (“Your order has been placed!”).

Test data (important)

Tests load credentials from:
tests/test-data/CloydBerryStoreTestData.json

Security note: that file currently contains real-looking usernames/passwords in plain text. For a public repo, it’s strongly recommended to:

remove real credentials immediately

switch to environment variables (or GitHub Actions secrets)

add a test-data.sample.json and ignore the real one via .gitignore

Extending the framework

Common next steps if you want to evolve this into a more “production-style” API framework:

Add npm run test / npm run test:headed / npm run report scripts in package.json

Centralize base URLs + headers (config/env-driven)

Add an API client layer (helpers per feature area)

Add schema validation (optional) and richer assertions

Add CI (GitHub Actions) to run on PRs and publish the HTML report artifact