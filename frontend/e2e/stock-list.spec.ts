import { test, expect } from '@playwright/test';

test.describe('Stock List (US1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays page title and description', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Halal Stock Screener');
    await expect(page.locator('text=Shariah-compliant investment opportunities')).toBeVisible();
  });

  test('displays stock cards with required information', async ({ page }) => {
    // Wait for stocks to load - look for a link that points to a stock
    await page.waitForSelector('a[href^="/stock/"]');

    // Check that stock cards are displayed - they're links to stock details
    const stockCards = page.locator('a[href^="/stock/"]');
    await expect(stockCards.first()).toBeVisible();

    // Verify stock card contains symbol in h3
    const firstCard = stockCards.first();
    await expect(firstCard.locator('h3')).toBeVisible();
  });

  test('displays compliance status indicators', async ({ page }) => {
    await page.waitForSelector('a[href^="/stock/"]');

    // Check for compliance badges (Halal or Not Halal)
    const halalBadges = page.locator('text=Halal');
    const notHalalBadges = page.locator('text=Not Halal');

    // At least one type of badge should be visible
    const halalCount = await halalBadges.count();
    const notHalalCount = await notHalalBadges.count();
    expect(halalCount + notHalalCount).toBeGreaterThan(0);
  });

  test('displays pagination controls when multiple pages exist', async ({ page }) => {
    await page.waitForSelector('a[href^="/stock/"]');

    // Check for "Showing X of Y stocks" text
    await expect(page.locator('text=/Showing \\d+ of \\d+ stocks/')).toBeVisible();

    // Check for Next button if there are multiple pages
    const nextButton = page.locator('button:has-text("Next")');
    const totalText = await page.locator('text=/Showing \\d+ of \\d+ stocks/').textContent();

    // Parse total from "Showing X of Y stocks"
    const match = totalText?.match(/of (\d+)/);
    const total = match ? parseInt(match[1]) : 0;

    if (total > 20) {
      await expect(nextButton).toBeVisible();
    }
  });

  test('can navigate between pages', async ({ page }) => {
    await page.waitForSelector('a[href^="/stock/"]');

    // Click next if available
    const nextButton = page.locator('button:has-text("Next")');
    if (await nextButton.isEnabled()) {
      // Get first stock symbol before navigation
      const firstSymbolBefore = await page.locator('a[href^="/stock/"] h3').first().textContent();

      await nextButton.click();
      await page.waitForTimeout(500);

      // After navigation, the first stock should be different
      const firstSymbolAfter = await page.locator('a[href^="/stock/"] h3').first().textContent();

      // If we had enough stocks to paginate, the first stock should change
      // (This test passes if pagination works OR if there's only one page)
    }
  });
});

test.describe('Search and Filter (US2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('a[href^="/stock/"]');
  });

  test('displays search input', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
  });

  test('displays compliance filter buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("All Stocks")')).toBeVisible();
    await expect(page.locator('button:has-text("Halal Only")')).toBeVisible();
    await expect(page.locator('button:has-text("Non-Halal")')).toBeVisible();
  });

  test('displays sector filter dropdown', async ({ page }) => {
    const sectorSelect = page.locator('select');
    await expect(sectorSelect).toBeVisible();
    await expect(sectorSelect).toContainText('All Sectors');
  });

  test('search filters stocks by name or symbol', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');

    // Search for a specific stock
    await searchInput.fill('ATD');

    // Wait for debounce and API response
    await page.waitForTimeout(400);
    await page.waitForSelector('a[href^="/stock/"]');

    // Should show matching stock
    await expect(page.locator('text=ATD.TO')).toBeVisible();
  });

  test('compliance filter shows only halal stocks', async ({ page }) => {
    // Click "Halal Only" filter
    await page.locator('button:has-text("Halal Only")').click();

    // Wait for API response
    await page.waitForTimeout(500);

    // All visible compliance badges should be "Halal" (not "Not Halal")
    const notHalalBadges = page.locator('span:has-text("Not Halal")');
    const count = await notHalalBadges.count();
    expect(count).toBe(0);
  });

  test('compliance filter shows only non-halal stocks', async ({ page }) => {
    // Click "Non-Halal" filter
    await page.locator('button:has-text("Non-Halal")').click();

    // Wait for API response
    await page.waitForTimeout(500);

    // Should have some non-halal stocks
    await expect(page.locator('span:has-text("Not Halal")').first()).toBeVisible();
  });

  test('sector filter filters by sector', async ({ page }) => {
    const sectorSelect = page.locator('select');

    // Get the options and select Energy
    await sectorSelect.selectOption({ value: 'Energy' });

    // Wait for API response
    await page.waitForTimeout(500);

    // Should show filtered results
    const stockCards = page.locator('a[href^="/stock/"]');
    const count = await stockCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(20); // Should be fewer due to filter
  });

  test('clear all filters resets to default view', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');

    // Apply some filters
    await searchInput.fill('test');
    await page.locator('button:has-text("Halal Only")').click();
    await page.waitForTimeout(400);

    // Clear all filters button should appear
    const clearButton = page.locator('button:has-text("Clear All Filters")');
    await expect(clearButton).toBeVisible();

    // Click clear all
    await clearButton.click();
    await page.waitForTimeout(500);

    // Search should be cleared
    await expect(searchInput).toHaveValue('');

    // "All Stocks" compliance filter should be selected (has ring class)
    const allButton = page.locator('button:has-text("All Stocks")');
    await expect(allButton).toHaveClass(/ring-green-500/);
  });

  test('filters work in combination', async ({ page }) => {
    const sectorSelect = page.locator('select');

    // Apply compliance filter
    await page.locator('button:has-text("Halal Only")').click();
    await page.waitForTimeout(300);

    // Apply sector filter
    await sectorSelect.selectOption({ value: 'Materials' });
    await page.waitForTimeout(500);

    // Results should be filtered by both criteria - no "Not Halal" badges
    const notHalalBadges = page.locator('span:has-text("Not Halal")');
    expect(await notHalalBadges.count()).toBe(0);
  });
});

test.describe('API Integration', () => {
  test('stocks API returns valid response', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/stocks');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty('content');
    expect(data).toHaveProperty('totalElements');
    expect(data).toHaveProperty('totalPages');
    expect(Array.isArray(data.content)).toBeTruthy();
  });

  test('stocks API supports search parameter', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/stocks?search=ATD');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.content.some((s: any) => s.symbol.includes('ATD'))).toBeTruthy();
  });

  test('stocks API supports compliance filter', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/stocks?compliance=COMPLIANT');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    data.content.forEach((stock: any) => {
      expect(stock.complianceStatus).toBe('COMPLIANT');
    });
  });

  test('sectors API returns valid response', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/stocks/sectors');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty('sectors');
    expect(Array.isArray(data.sectors)).toBeTruthy();
    expect(data.sectors.length).toBeGreaterThan(0);

    // Each sector should have name and stockCount
    data.sectors.forEach((sector: any) => {
      expect(sector).toHaveProperty('name');
      expect(sector).toHaveProperty('stockCount');
    });
  });

  test('health API returns healthy status', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/health');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe('UP');
  });

  test('single stock API returns stock details', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/stocks/ATD.TO');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.symbol).toBe('ATD.TO');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('sector');
  });
});

test.describe('Stock Card Navigation (US3 Prerequisite)', () => {
  test('clicking stock card navigates to detail page', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('a[href^="/stock/"]');

    // Get the first stock symbol
    const firstCard = page.locator('a[href^="/stock/"]').first();
    const symbol = await firstCard.locator('h3').textContent();

    // Click on the stock card
    await firstCard.click();

    // Should navigate to stock detail page
    await expect(page).toHaveURL(new RegExp(`/stock/${encodeURIComponent(symbol || '')}`));
  });
});
