# Playwright API Automation Framework

A lightweight **API test automation framework** built using **Playwright Test** and the Playwright **APIRequestContext**.  
This project demonstrates how to automate **REST API workflows** using Playwright without launching a browser.

The framework includes examples for common e-commerce workflows such as:

- Login authentication
- Adding items to cart
- Wishlist operations
- Completing a purchase

It also demonstrates **data-driven testing**, **test utilities**, and **structured Playwright test reporting**.

---

# Why this project exists

This repository was built as a **portfolio project** to demonstrate modern API test automation practices using Playwright.

The goals of the project are to showcase:

- Playwright used for **API automation (not only UI testing)**
- Clean test organization and reusable utilities
- Data-driven testing using JSON files
- Real-world workflow validation
- A maintainable test structure suitable for scaling

---

# Tech Stack

- **JavaScript (Node.js)**
- **Playwright Test**
- **Playwright APIRequestContext**
- **JSON-based test data**
- **Playwright HTML reports**

---

# Project Structure


Api-automation-framework-playwright
│
├── tests
│ ├── test-data
│ │ └── CloudBerryStoreTestData.json
│ │
│ ├── TC02_Login_API.spec.js
│ ├── TC03_AddToCart_API.spec.js
│ ├── TC03_AddToCart_Hybrid.spec.js
│ ├── TC04_CompletePurchase_API.spec.js
│ ├── TC05_AddToWishList_API.spec.js
│ └── TC06_AddAffiliate_API.spec.js
│
├── utils
│ └── Utils.js
│
├── playwright.config.js
├── package.json
└── package-lock.json


---

# Quick Start

## 1. Install dependencies


npm install


---

## 2. Run all tests


npx playwright test


---

## 3. Run a single test file


npx playwright test tests/TC02_Login_API.spec.js


---

## 4. Open the Playwright report


npx playwright show-report


---

# Test Coverage

## Login API Test

Validates authentication workflow by:

- Requesting the login page
- Extracting the login token
- Submitting login credentials via POST request
- Validating successful authentication response

---

## Add to Cart API Test

Demonstrates:

- Posting cart requests using form parameters
- Generating dynamic delivery date values
- Validating cart contents

---

## Hybrid Test Example

The hybrid example demonstrates how Playwright can combine:

- API requests
- UI interaction

This approach can accelerate test setup or state preparation.

---

## Complete Purchase API Test

Validates an end-to-end purchase workflow including:

- Authentication
- Adding product to cart
- Checkout completion
- Purchase confirmation validation

---

# Test Data

Test data is stored in:


tests/test-data/CloudBerryStoreTestData.json


This allows credentials and request parameters to be separated from test logic.

---

# Reporting

Playwright generates an **HTML report** after execution.

To view the report:


npx playwright show-report


The report provides:

- Test execution summary
- Pass/fail status
- Error stack traces
- Trace artifacts when enabled

---

# Possible Future Improvements

Some improvements that could evolve this framework further:

- Environment configuration (dev / stage / prod)
- API client abstraction layer
- Schema validation for responses
- CI/CD integration (GitHub Actions)
- Test tagging and filtering
- Environment variable management for credentials

---

# Author

Michael Fisher  
Senior QA Engineer / SDET  
Seattle, WA