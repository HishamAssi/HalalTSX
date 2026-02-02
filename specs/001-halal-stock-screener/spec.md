# Feature Specification: Halal Stock Screener for TSX

**Feature Branch**: `001-halal-stock-screener`
**Created**: 2026-01-25
**Status**: Draft
**Input**: User description: "Halal Stock Screener application for viewing, filtering, and analyzing Halal-compliant stocks from the Toronto Stock Exchange with real-time price updates, compliance criteria display, and stock detail pages."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Halal Stock List (Priority: P1)

As a Muslim investor, I want to view a list of TSX stocks that have been screened for Halal compliance so that I can quickly identify permissible investment opportunities without manual research.

**Why this priority**: This is the core value proposition of the application. Without a viewable list of Halal-compliant stocks, the application has no purpose. Users need to see available Halal stocks as the fundamental starting point for any investment decision.

**Independent Test**: Can be fully tested by loading the application and verifying that a list of TSX stocks appears with their current price, name, ticker symbol, and Halal compliance status clearly displayed. Delivers immediate value by showing users which stocks are permissible to invest in.

**Acceptance Scenarios**:

1. **Given** the user opens the application, **When** the stock list page loads, **Then** the user sees a list of TSX stocks with their current price, name, ticker symbol, and Halal compliance status
2. **Given** the stock list is displayed, **When** stock prices change in the market, **Then** the displayed prices update within a reasonable timeframe to reflect current values
3. **Given** the user is viewing the stock list, **When** a stock is Halal-compliant, **Then** it is clearly marked as compliant with a visual indicator
4. **Given** the user is viewing the stock list, **When** a stock fails Halal screening, **Then** it is clearly marked as non-compliant with the specific reason(s) visible

---

### User Story 2 - Search and Filter Stocks (Priority: P2)

As an investor, I want to search for specific stocks and filter the list by various criteria so that I can quickly find stocks that match my investment interests and compliance requirements.

**Why this priority**: Once users can see the stock list, they need to efficiently navigate and find relevant stocks. Filtering and search transform a static list into a usable tool, especially as the number of stocks grows.

**Independent Test**: Can be fully tested by using the search box to find a specific stock by name or ticker, and applying filters to narrow the list. Delivers value by reducing time spent scrolling through hundreds of stocks.

**Acceptance Scenarios**:

1. **Given** the user is on the stock list page, **When** they type a stock name or ticker in the search box, **Then** the list filters in real-time to show matching stocks
2. **Given** the user wants to see only Halal-compliant stocks, **When** they apply the "Halal Only" filter, **Then** only stocks that pass all Halal screening criteria are displayed
3. **Given** the user wants to filter by sector, **When** they select a specific sector from the filter options, **Then** only stocks from that sector are displayed
4. **Given** the user has applied multiple filters, **When** they click "Clear Filters", **Then** all filters are removed and the full stock list is displayed

---

### User Story 3 - View Stock Details and Compliance Breakdown (Priority: P3)

As an investor, I want to view detailed information about a specific stock including its price history chart and detailed Halal compliance breakdown so that I can make informed investment decisions.

**Why this priority**: After finding a stock of interest, investors need deeper information before committing capital. The compliance breakdown provides transparency and builds trust in the screening process.

**Independent Test**: Can be fully tested by clicking on any stock from the list and verifying that the detail page shows price charts, company information, and a complete breakdown of Halal compliance criteria with pass/fail indicators for each metric.

**Acceptance Scenarios**:

1. **Given** the user is viewing the stock list, **When** they click on a specific stock, **Then** they are taken to a detail page showing comprehensive information about that stock
2. **Given** the user is on a stock detail page, **When** the page loads, **Then** they see a price chart showing historical price movement
3. **Given** the user is viewing stock details, **When** they look at the compliance section, **Then** they see each Halal screening criterion with its current value and pass/fail status:
   - Business activity screening (prohibited activities check)
   - Debt ratio (interest-bearing debt / market cap < 33%)
   - Liquidity ratio (cash + interest-bearing securities / market cap < 33%)
   - Non-halal income ratio (< 5% of total revenue)
4. **Given** a stock requires income purification, **When** the user views the compliance section, **Then** they see a clear indicator that purification is required and the recommended purification percentage

---

### User Story 4 - Understand Halal Screening Criteria (Priority: P4)

As a new user unfamiliar with Islamic finance, I want to understand what makes a stock Halal or non-Halal so that I can trust the screening results and educate myself on Shariah-compliant investing.

**Why this priority**: Educational content builds user trust and helps users make their own informed decisions. It differentiates the application from a simple "yes/no" checker by providing understanding.

**Independent Test**: Can be fully tested by accessing the educational content section and verifying that all Halal screening principles are clearly explained with examples.

**Acceptance Scenarios**:

1. **Given** the user wants to learn about Halal investing, **When** they access the information/help section, **Then** they see clear explanations of all screening criteria used
2. **Given** the user is reading about screening criteria, **When** they view each criterion, **Then** they see the threshold values (e.g., 33% debt ratio, 5% non-halal income) and why these limits exist
3. **Given** the user is on a stock detail page, **When** they see a failed criterion, **Then** they can access an explanation of what that criterion means and why the stock failed

---

### User Story 5 - Set Price Alerts (Priority: P5 - Optional for v1)

As an active investor, I want to set price alerts for stocks I'm interested in so that I can be notified when a stock reaches my target price without constantly monitoring the application.

**Why this priority**: This is a convenience feature that enhances the user experience but is not essential for the core Halal screening functionality. Marked as optional for the initial release.

**Independent Test**: Can be fully tested by setting a price alert on a stock, then verifying that a notification is received when the price threshold is crossed.

**Acceptance Scenarios**:

1. **Given** the user is on a stock detail page, **When** they click "Set Alert", **Then** they can specify a target price and direction (above/below)
2. **Given** the user has set a price alert, **When** the stock price crosses the specified threshold, **Then** the user receives a notification
3. **Given** the user has existing alerts, **When** they access their alerts list, **Then** they can view, edit, or delete their alerts

---

### User Story 6 - Switch Between Test Data and Full-Scale Data (Priority: P2)

As a developer or power user, I want to switch between a test dataset (subset of ~39 stocks) and full-scale production data (all TSX stocks) so that I can evaluate how the application performs at scale and validate that the UI handles larger datasets correctly.

**Why this priority**: Testing with realistic data volume is essential before production deployment. The current 39-stock test set may hide performance issues, pagination bugs, or UX problems that only surface with hundreds of stocks. This enables proper load testing and user acceptance testing.

**Independent Test**: Can be fully tested by accessing a data mode toggle (via settings, query parameter, or environment configuration), switching between modes, and verifying that the stock list reflects the appropriate dataset size.

**Acceptance Scenarios**:

1. **Given** the application is running in test mode, **When** the user views the stock list, **Then** they see approximately 39 test stocks with sample compliance data
2. **Given** the application is running in full-scale mode, **When** the user views the stock list, **Then** they see all available TSX stocks (~500+) with real or simulated compliance data
3. **Given** the user switches from test mode to full-scale mode, **When** the stock list reloads, **Then** the list updates to display the full TSX dataset without requiring application restart
4. **Given** full-scale mode is active, **When** the user applies search and filter operations, **Then** performance remains acceptable (results within 10 seconds per SC-001)
5. **Given** the application is in full-scale mode, **When** the user navigates to stock detail pages, **Then** all detail page features work correctly with the expanded dataset

---

### Edge Cases

- What happens when stock data is unavailable or delayed? The system displays a clear message indicating data unavailability and shows the last known price with a timestamp.
- How does the system handle stocks with incomplete financial data for compliance screening? The stock is marked as "Unable to Verify" with an explanation that insufficient data is available for complete Halal screening.
- What happens when a previously Halal stock becomes non-compliant? The stock's status updates automatically; if watchlist/alerts are implemented, users are notified of the status change.
- How does the system handle market hours vs. after-hours pricing? The system clearly indicates whether displayed prices are from live market data or after-hours/delayed data.
- What happens when the external stock data source is unavailable? The system displays cached data with a clear indicator of when it was last updated and a message about the data source issue.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a list of TSX stocks with their current price, ticker symbol, company name, and Halal compliance status
- **FR-002**: System MUST update stock prices in near-real-time (within reasonable delay based on data source limitations)
- **FR-003**: System MUST allow users to search stocks by company name or ticker symbol
- **FR-004**: System MUST allow users to filter stocks by Halal compliance status (compliant, non-compliant, all)
- **FR-005**: System MUST allow users to filter stocks by market sector
- **FR-006**: System MUST provide individual stock detail pages accessible from the stock list
- **FR-007**: System MUST display price history charts on stock detail pages
- **FR-008**: System MUST screen each stock against business activity criteria (prohibited activities: conventional finance, alcohol, tobacco, pork, gambling, adult entertainment, weapons manufacturing)
- **FR-009**: System MUST calculate and display debt ratio (interest-bearing debt / trailing 12-month average market cap) with 33% threshold
- **FR-010**: System MUST calculate and display liquidity ratio (cash + interest-bearing securities / trailing 12-month average market cap) with 33% threshold
- **FR-011**: System MUST calculate and display non-halal income ratio with 5% threshold
- **FR-012**: System MUST clearly indicate when a compliant stock requires income purification and display the purification percentage
- **FR-013**: System MUST provide educational content explaining Halal screening criteria and thresholds
- **FR-014**: System MUST persist stock data for display during data source outages
- **FR-015**: System MUST clearly indicate data freshness with timestamps showing when prices were last updated
- **FR-016**: System SHOULD allow users to set price alerts for specific stocks (optional for v1)
- **FR-017**: System SHOULD notify users when price alert thresholds are crossed (optional for v1)
- **FR-018**: System MUST support switching between test data mode (~39 stocks) and full-scale data mode (all TSX stocks ~500+)
- **FR-019**: System MUST maintain acceptable performance (SC-001, SC-002) when operating in full-scale data mode

### Key Entities

- **Stock**: Represents a TSX-listed company with attributes including ticker symbol, company name, current price, price history, sector, and market capitalization
- **Compliance Screening Result**: Represents the Halal screening outcome for a stock including business activity status, debt ratio, liquidity ratio, non-halal income ratio, overall compliance status, and purification requirement
- **Financial Metrics**: Company financial data used for screening including total debt, interest-bearing debt, cash holdings, interest-bearing securities, total revenue, and non-halal revenue sources
- **Price Alert** (optional v1): User-defined notification trigger including target stock, price threshold, direction (above/below), and notification status

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find any specific TSX stock within 10 seconds using search functionality
- **SC-002**: Stock list loads and displays within 3 seconds on initial page load
- **SC-003**: Price updates reflect in the user interface within 60 seconds of market changes (subject to data source refresh rates)
- **SC-004**: Users can understand why a stock is marked Halal or non-Halal by viewing no more than one additional page (the detail page)
- **SC-005**: 90% of users can successfully identify Halal-compliant stocks without external guidance
- **SC-006**: All four Halal screening criteria (business activity, debt ratio, liquidity ratio, income ratio) are calculated and displayed for each stock
- **SC-007**: System remains usable (displays cached data) during external data source outages of up to 24 hours
- **SC-008**: Users can complete the journey from opening the app to viewing detailed compliance information for a specific stock in under 30 seconds

## Assumptions

- Stock financial data (debt, cash holdings, revenue breakdown) is available through the chosen external data source or can be sourced from public financial statements
- TSX sector classifications are available through the data source
- Users have basic understanding of stock investing concepts (price, ticker symbols, market cap)
- The application will initially support English language only
- Business activity screening will be based on industry sector classification and known prohibited business types; manual override capability may be needed for edge cases
- Real-time pricing is subject to the limitations of the free-tier data source (may have 15-minute delay)
- Purification percentages will be calculated based on the ratio of non-halal income to total income for stocks that fall under the 5% threshold but have some non-halal revenue
- Data mode switching (test vs full-scale) can be controlled via environment variable, or configuration setting, depending on implementation preference
- Full-scale data mode may require additional API rate limit considerations with Alpha Vantage or alternative data sources for complete TSX coverage
