import { test, expect } from '@playwright/test'

test.describe('Detail Page Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to detail page when clicking on destination card', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Find and click the first destination card
    const firstCard = page.locator('article').first()
    await expect(firstCard).toBeVisible()
    
    // Get the destination name before clicking
    const destinationName = await firstCard.locator('h4').textContent()
    
    // Click the card
    await firstCard.click()
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    
    // Verify URL contains /detail/
    expect(page.url()).toContain('/detail/')
    
    // Verify the detail page shows the destination name
    const detailTitle = page.locator('h1')
    await expect(detailTitle).toBeVisible()
    await expect(detailTitle).toContainText(destinationName || '')
  })

  test('should navigate to detail page when clicking "查看详情" button', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Find and click the "查看详情" button on the first card
    const detailButton = page.locator('article button:has-text("查看详情")').first()
    await expect(detailButton).toBeVisible()
    
    await detailButton.click()
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    
    // Verify URL contains /detail/
    expect(page.url()).toContain('/detail/')
  })

  test('should display all detail page sections', async ({ page }) => {
    // Navigate directly to a detail page
    await page.goto('/detail/bali')
    await page.waitForLoadState('networkidle')
    
    // Check main title is visible
    const title = page.locator('h1')
    await expect(title).toBeVisible()
    await expect(title).toContainText('巴厘岛')
    
    // Check destination image is visible
    const heroImage = page.locator('img[alt*="巴厘岛"]').first()
    await expect(heroImage).toBeVisible()
    
    // Check price is displayed
    const price = page.locator('text=/¥\\d{1,3}(,\\d{3})*/').first()
    await expect(price).toBeVisible()
    
    // Check sections are present
    await expect(page.locator('text=目的地概览')).toBeVisible()
    await expect(page.locator('text=旅行亮点')).toBeVisible()
    await expect(page.locator('text=套餐包含')).toBeVisible()
    
    // Check "立即预订" button is present
    const bookButton = page.locator('a:has-text("立即预订")')
    await expect(bookButton).toBeVisible()
  })

  test('should navigate to booking page from detail page', async ({ page }) => {
    // Navigate to detail page
    await page.goto('/detail/tokyo')
    await page.waitForLoadState('networkidle')
    
    // Click the "立即预订" button
    const bookButton = page.locator('a:has-text("立即预订")')
    await expect(bookButton).toBeVisible()
    await bookButton.click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Verify we're on the booking page
    expect(page.url()).toContain('/booking')
    expect(page.url()).toContain('dest=tokyo')
  })

  test('should navigate back to home page when clicking "返回列表"', async ({ page }) => {
    // Navigate to detail page
    await page.goto('/detail/paris')
    await page.waitForLoadState('networkidle')
    
    // Click the "返回列表" button
    const backButton = page.locator('button:has-text("返回列表")')
    await expect(backButton).toBeVisible()
    await backButton.click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Verify we're back on the home page
    expect(page.url()).toBe('http://localhost:5173/')
    
    // Verify destination cards are visible
    await expect(page.locator('article').first()).toBeVisible()
  })

  test('should handle invalid destination ID', async ({ page }) => {
    // Navigate to an invalid detail page
    await page.goto('/detail/invalid-id')
    await page.waitForLoadState('networkidle')
    
    // Check that the not found message is displayed
    await expect(page.locator('text=目的地未找到')).toBeVisible()
    await expect(page.locator('text=抱歉，我们找不到您要查看的目的地')).toBeVisible()
    
    // Check "返回首页" link is present
    const homeLink = page.locator('a:has-text("返回首页")')
    await expect(homeLink).toBeVisible()
  })

  test('should navigate from home to detail to booking', async ({ page }) => {
    // Start at home page
    await page.waitForLoadState('networkidle')
    
    // Click first destination card
    await page.locator('article').first().click()
    await page.waitForLoadState('networkidle')
    
    // Verify we're on detail page
    expect(page.url()).toContain('/detail/')
    
    // Click book button
    await page.locator('a:has-text("立即预订")').click()
    await page.waitForLoadState('networkidle')
    
    // Verify we're on booking page
    expect(page.url()).toContain('/booking')
  })
})
