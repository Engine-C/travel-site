# E2E Tests for Travel Site

This directory contains end-to-end tests for the travel site application using Playwright.

## Test Files

### `detail-page.spec.ts`
Tests for the destination detail page functionality, including:
- Navigation from home page to detail page
- Detail page content verification
- Navigation to booking page with query parameters
- Return to home page functionality
- Error handling for invalid destination IDs
- Full user flow testing

## Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/detail-page.spec.ts

# Run tests with debugging
npx playwright test --debug
```

## Test Structure

Each test follows the Arrange-Act-Assert pattern:
1. **Arrange**: Navigate to the starting page
2. **Act**: Perform user interactions (clicks, navigation)
3. **Assert**: Verify expected outcomes

## Test Coverage

The tests verify:
- ✅ User can click destination cards to view details
- ✅ All detail page sections render correctly
- ✅ Navigation between pages works as expected
- ✅ Query parameters are passed correctly
- ✅ Error states are handled gracefully
- ✅ Complete user journeys function properly

## Writing New Tests

Follow the existing test patterns:
```typescript
test('should do something', async ({ page }) => {
  // Navigate to page
  await page.goto('/')
  
  // Perform actions
  await page.locator('button').click()
  
  // Verify results
  expect(page.url()).toContain('/expected')
})
```

## Debugging Failed Tests

1. Run with `--debug` flag to step through tests
2. Use `--headed` to see browser actions
3. Check screenshots in `test-results/` directory
4. Review the HTML report: `npx playwright show-report`
