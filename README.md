# Playwright Test Tagging Demo (TypeScript)

This repository demonstrates how to use test tagging in Playwright with TypeScript, as explained in the blog:
**How to Tag Tests in Playwright: A Deep Dive with TypeScript Examples**

## Overview

- Learn how to organize, filter, and run Playwright tests using tags (e.g., `@smoke`, `@regression`, `@cart`).
- See both the old (pre-v1.42) and new (v1.42+) tagging approaches in action.
- Practice running tests locally and on LambdaTest’s cloud grid.

## Branches

- **main**:  
  - Run tests locally in your browser.
  - Examples use Playwright’s built-in test runner and tagging features.
- **feature/lambdatest-grid**:  
  - Run tests on LambdaTest’s cloud grid.
  - Includes additional configuration (`playwright.config.ts`, `lambdatest-setup.ts`) for cloud execution.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/rakesh-vardan/playwright-tags-lambdatest.git
   cd playwright-tags-lambdatest
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run tests locally (main branch):**
   ```sh
   npx playwright test
   ```

4. **Run tests by tag:**
   ```sh
   # Run all smoke tests
   npx playwright test --grep "@smoke"

   # Run all cart tests
   npx playwright test --grep "@cart"
   ```

5. **Switch to LambdaTest branch for cloud execution:**
   ```sh
   git checkout feature/lambdatest-grid
   # Add your LambdaTest credentials as environment variables or GitHub secrets
   ```

   See the blog for LambdaTest setup details.

## Tagging Strategy

- **Test Types:** `@smoke`, `@regression`, `@e2e`, `@sanity`
- **Feature Areas:** `@cart`, `@search`, `@account`, `@navigation`, `@homepage`
- **Priority:** `@p1`, `@p2`, `@p3`
- **Categories:** `@positive`, `@negative`, `@validation`

Combine tags for flexible test selection:
```sh
# Run smoke tests for homepage
npx playwright test --grep "@smoke.*@homepage"

# Exclude regression tests
npx playwright test --grep-invert "@regression"
```

## Running on LambdaTest

- Switch to the `feature/lambdatest-grid` branch.
- Configure your LambdaTest credentials.
- Use the provided GitHub Actions workflow or run tests with:
  ```sh
  npx playwright test --project="chrome:latest:Windows 11@lambdatest" --grep "@smoke"
  ```

## References

- [Playwright Tagging Docs](https://playwright.dev/docs/test-annotations#tag-tests)
- [Playwright Release Notes v1.42](https://playwright.dev/docs/release-notes#version-142)
- [LambdaTest](https://www.lambdatest.com/)

---

Feel free to reach out or refer to the blog for more details and advanced usage!
