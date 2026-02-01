# Tasks: Halal Stock Screener for TSX

**Input**: Design documents from `/specs/001-halal-stock-screener/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.yaml

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/main/java/com/halaltsx/`
- **Frontend**: `frontend/src/`
- **Tests Backend**: `backend/src/test/java/com/halaltsx/`
- **Tests Frontend**: `frontend/src/__tests__/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend project structure with Spring Boot in backend/pom.xml
- [x] T002 Create frontend project structure with Vite + React in frontend/package.json
- [x] T003 [P] Create docker-compose.yml with PostgreSQL and service definitions
- [x] T004 [P] Create backend Dockerfile in backend/Dockerfile
- [x] T005 [P] Create frontend Dockerfile in frontend/Dockerfile
- [x] T006 [P] Create .env.example with environment variable templates

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Foundation

- [x] T007 Create Spring Boot main application class in backend/src/main/java/com/halaltsx/HalalTsxApplication.java
- [x] T008 Configure application.yml with database, Alpha Vantage, and server settings in backend/src/main/resources/application.yml
- [x] T009 [P] Create AlphaVantageConfig for API client configuration in backend/src/main/java/com/halaltsx/config/AlphaVantageConfig.java
- [x] T010 [P] Create CorsConfig for frontend access in backend/src/main/java/com/halaltsx/config/CorsConfig.java
- [x] T011 Create Flyway initial schema migration V1__initial_schema.sql in backend/src/main/resources/db/migration/V1__initial_schema.sql
- [x] T012 [P] Create Stock JPA entity in backend/src/main/java/com/halaltsx/model/Stock.java
- [x] T013 [P] Create ComplianceResult JPA entity in backend/src/main/java/com/halaltsx/model/ComplianceResult.java
- [x] T014 [P] Create FinancialMetrics JPA entity in backend/src/main/java/com/halaltsx/model/FinancialMetrics.java
- [x] T015 [P] Create PriceHistory JPA entity in backend/src/main/java/com/halaltsx/model/PriceHistory.java
- [x] T016 [P] Create StockRepository interface in backend/src/main/java/com/halaltsx/repository/StockRepository.java
- [x] T017 [P] Create ComplianceRepository interface in backend/src/main/java/com/halaltsx/repository/ComplianceRepository.java
- [x] T018 [P] Create FinancialMetricsRepository interface in backend/src/main/java/com/halaltsx/repository/FinancialMetricsRepository.java
- [x] T019 [P] Create PriceHistoryRepository interface in backend/src/main/java/com/halaltsx/repository/PriceHistoryRepository.java
- [x] T020 Create AlphaVantageService for external API integration in backend/src/main/java/com/halaltsx/service/AlphaVantageService.java
- [x] T021 [P] Create ErrorResponse DTO in backend/src/main/java/com/halaltsx/dto/ErrorResponse.java
- [x] T022 [P] Create DataFreshness DTO in backend/src/main/java/com/halaltsx/dto/DataFreshness.java
- [x] T023 Create GlobalExceptionHandler for API error handling in backend/src/main/java/com/halaltsx/config/GlobalExceptionHandler.java
- [x] T024 Create HealthController with /health endpoint in backend/src/main/java/com/halaltsx/controller/HealthController.java

### Frontend Foundation

- [x] T025 Configure Vite with TypeScript in frontend/vite.config.ts
- [x] T026 Configure TypeScript compiler in frontend/tsconfig.json
- [x] T027 [P] Create TypeScript type definitions in frontend/src/types/index.ts
- [x] T028 [P] Create API service layer with axios in frontend/src/services/api.ts
- [x] T029 Create main App component with React Router in frontend/src/App.tsx
- [x] T030 [P] Configure TanStack Query provider in frontend/src/main.tsx
- [x] T031 [P] Create base layout component in frontend/src/components/Layout/Layout.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View Halal Stock List (Priority: P1) 🎯 MVP

**Goal**: Display a list of TSX stocks with current price, name, ticker symbol, and Halal compliance status with visual indicators

**Independent Test**: Load the application and verify a list of stocks appears with prices, names, tickers, and compliance status (COMPLIANT with green indicator, NON_COMPLIANT with red indicator and reason)

### Backend Implementation for US1

- [x] T032 [P] [US1] Create StockDto for API responses in backend/src/main/java/com/halaltsx/dto/StockDto.java
- [x] T033 [P] [US1] Create StockSummaryDto for list responses in backend/src/main/java/com/halaltsx/dto/StockSummaryDto.java
- [x] T034 [P] [US1] Create StockListResponse with pagination in backend/src/main/java/com/halaltsx/dto/StockListResponse.java
- [x] T035 [US1] Create ComplianceService with screening logic in backend/src/main/java/com/halaltsx/service/ComplianceService.java
- [x] T036 [US1] Implement business activity screening in ComplianceService (prohibited sectors check)
- [x] T037 [US1] Implement debt ratio calculation in ComplianceService (< 33% threshold)
- [x] T038 [US1] Implement liquidity ratio calculation in ComplianceService (< 33% threshold)
- [x] T039 [US1] Implement income ratio calculation in ComplianceService (< 5% threshold)
- [x] T040 [US1] Implement purification percentage calculation in ComplianceService
- [x] T041 [US1] Create StockService for business logic in backend/src/main/java/com/halaltsx/service/StockService.java
- [x] T042 [US1] Create StockController with GET /stocks endpoint in backend/src/main/java/com/halaltsx/controller/StockController.java
- [x] T043 [US1] Create PriceUpdateService for scheduled price refresh in backend/src/main/java/com/halaltsx/service/PriceUpdateService.java
- [x] T044 [US1] Add seed data script for initial TSX Composite stocks in backend/src/main/resources/db/migration/V2__seed_tsx_stocks.sql

### Frontend Implementation for US1

- [x] T045 [P] [US1] Create useStocks hook for fetching stock list in frontend/src/hooks/useStocks.ts
- [x] T046 [P] [US1] Create usePriceUpdates hook for polling in frontend/src/hooks/usePriceUpdates.ts
- [x] T047 [US1] Create StockCard component for individual stock display in frontend/src/components/StockCard/StockCard.tsx
- [x] T048 [US1] Create ComplianceIndicator component for visual status in frontend/src/components/ComplianceIndicator/ComplianceIndicator.tsx
- [x] T049 [US1] Create StockList component with pagination in frontend/src/components/StockList/StockList.tsx
- [x] T050 [US1] Create HomePage with stock list integration in frontend/src/pages/HomePage.tsx
- [x] T051 [US1] Add price update timestamp display to StockCard component
- [x] T052 [US1] Add loading and error states to HomePage

**Checkpoint**: User can view list of TSX stocks with prices and Halal compliance status

---

## Phase 4: User Story 2 - Search and Filter Stocks (Priority: P2)

**Goal**: Enable search by name/ticker and filtering by compliance status and sector

**Independent Test**: Type a stock name or ticker in search box and verify list filters in real-time. Apply "Halal Only" filter and verify only compliant stocks show. Select a sector filter and verify results.

### Backend Implementation for US2

- [x] T053 [P] [US2] Create SectorDto for sector list in backend/src/main/java/com/halaltsx/dto/SectorDto.java
- [x] T054 [P] [US2] Create SectorListResponse in backend/src/main/java/com/halaltsx/dto/SectorListResponse.java
- [x] T055 [US2] Add search and filter parameters to StockRepository queries
- [x] T056 [US2] Update StockService with search/filter logic (name, ticker, compliance, sector)
- [x] T057 [US2] Update StockController GET /stocks to accept search, compliance, sector query params
- [x] T058 [US2] Create GET /sectors endpoint in StockController for sector filter options

### Frontend Implementation for US2

- [x] T059 [P] [US2] Create SearchInput component in frontend/src/components/SearchFilter/SearchInput.tsx
- [x] T060 [P] [US2] Create ComplianceFilter component in frontend/src/components/SearchFilter/ComplianceFilter.tsx
- [x] T061 [P] [US2] Create SectorFilter component in frontend/src/components/SearchFilter/SectorFilter.tsx
- [x] T062 [US2] Create SearchFilter container component in frontend/src/components/SearchFilter/SearchFilter.tsx
- [x] T063 [US2] Create useSectors hook for fetching sector list in frontend/src/hooks/useSectors.ts
- [x] T064 [US2] Update useStocks hook to accept search/filter parameters
- [x] T065 [US2] Integrate SearchFilter into HomePage with state management
- [x] T066 [US2] Add Clear Filters button functionality to SearchFilter

**Checkpoint**: User can search and filter the stock list by multiple criteria

---

## Phase 5: User Story 3 - View Stock Details and Compliance Breakdown (Priority: P3)

**Goal**: Display detailed stock page with price chart and complete Halal compliance breakdown showing all four criteria with values, thresholds, and pass/fail status

**Independent Test**: Click on any stock from the list and verify detail page shows price chart, company info, and compliance breakdown with business activity, debt ratio, liquidity ratio, and income ratio each showing current value and pass/fail status

### Backend Implementation for US3

- [ ] T067 [P] [US3] Create StockDetailDto with full compliance info in backend/src/main/java/com/halaltsx/dto/StockDetailDto.java
- [ ] T068 [P] [US3] Create ComplianceDto with criteria breakdown in backend/src/main/java/com/halaltsx/dto/ComplianceDto.java
- [ ] T069 [P] [US3] Create ComplianceCriterionDto for individual criteria in backend/src/main/java/com/halaltsx/dto/ComplianceCriterionDto.java
- [ ] T070 [P] [US3] Create PricePointDto for chart data in backend/src/main/java/com/halaltsx/dto/PricePointDto.java
- [ ] T071 [P] [US3] Create PriceHistoryResponse in backend/src/main/java/com/halaltsx/dto/PriceHistoryResponse.java
- [ ] T072 [US3] Create PriceHistoryService for historical data in backend/src/main/java/com/halaltsx/service/PriceHistoryService.java
- [ ] T073 [US3] Add GET /stocks/{symbol} endpoint to StockController for stock details
- [ ] T074 [US3] Add GET /stocks/{symbol}/price-history endpoint to StockController
- [ ] T075 [US3] Add GET /stocks/{symbol}/compliance endpoint to ComplianceController in backend/src/main/java/com/halaltsx/controller/ComplianceController.java

### Frontend Implementation for US3

- [ ] T076 [P] [US3] Create useStockDetail hook in frontend/src/hooks/useStockDetail.ts
- [ ] T077 [P] [US3] Create usePriceHistory hook in frontend/src/hooks/usePriceHistory.ts
- [ ] T078 [US3] Create PriceChart component using recharts in frontend/src/components/PriceChart/PriceChart.tsx
- [ ] T079 [US3] Create ComplianceBreakdown component in frontend/src/components/ComplianceBreakdown/ComplianceBreakdown.tsx
- [ ] T080 [US3] Create ComplianceCriterion component for individual criteria display in frontend/src/components/ComplianceBreakdown/ComplianceCriterion.tsx
- [ ] T081 [US3] Create StockDetail component with all info sections in frontend/src/components/StockDetail/StockDetail.tsx
- [ ] T082 [US3] Create StockDetailPage with routing in frontend/src/pages/StockDetailPage.tsx
- [ ] T083 [US3] Add purification indicator to ComplianceBreakdown when required
- [ ] T084 [US3] Add navigation from StockCard to StockDetailPage
- [ ] T084.1 [US3] Add data freshness indicator and staleness warning to StockDetailPage

**Checkpoint**: User can view detailed stock information with price chart and full compliance breakdown

---

## Phase 6: User Story 4 - Understand Halal Screening Criteria (Priority: P4)

**Goal**: Provide educational content explaining all screening criteria with thresholds and rationale

**Independent Test**: Access the education/help section and verify explanations for all four screening criteria are displayed with threshold values and Islamic finance rationale

### Backend Implementation for US4

- [ ] T085 [P] [US4] Create ScreeningCriterionDto for education content in backend/src/main/java/com/halaltsx/dto/ScreeningCriterionDto.java
- [ ] T086 [P] [US4] Create EducationResponse with criteria list in backend/src/main/java/com/halaltsx/dto/EducationResponse.java
- [ ] T087 [US4] Create EducationController with GET /education/criteria endpoint in backend/src/main/java/com/halaltsx/controller/EducationController.java
- [ ] T088 [US4] Create EducationService with screening criteria content in backend/src/main/java/com/halaltsx/service/EducationService.java

### Frontend Implementation for US4

- [ ] T089 [P] [US4] Create useEducation hook in frontend/src/hooks/useEducation.ts
- [ ] T090 [US4] Create CriterionExplanation component in frontend/src/components/Education/CriterionExplanation.tsx
- [ ] T091 [US4] Create EducationPage with all criteria explanations in frontend/src/pages/EducationPage.tsx
- [ ] T092 [US4] Add navigation link to EducationPage in Layout component
- [ ] T093 [US4] Add contextual help links from ComplianceBreakdown to specific criteria explanations

**Checkpoint**: User can access and understand all Halal screening criteria with rationale

---

## Phase 7: User Story 5 - Set Price Alerts (Priority: P5 - Optional)

**Goal**: Allow users to set price alerts and receive notifications when thresholds are crossed

**Note**: This story is marked optional for v1 per spec.md. Implement only if time permits.

**Independent Test**: On stock detail page, set a price alert with target price. Verify alert is saved and notification triggers when price crosses threshold.

### Backend Implementation for US5 (Optional)

- [ ] T094 [P] [US5] Create PriceAlert JPA entity in backend/src/main/java/com/halaltsx/model/PriceAlert.java
- [ ] T095 [P] [US5] Create PriceAlertRepository in backend/src/main/java/com/halaltsx/repository/PriceAlertRepository.java
- [ ] T096 [P] [US5] Create PriceAlertDto in backend/src/main/java/com/halaltsx/dto/PriceAlertDto.java
- [ ] T097 [US5] Create PriceAlertService with CRUD operations in backend/src/main/java/com/halaltsx/service/PriceAlertService.java
- [ ] T098 [US5] Add alert trigger logic to PriceUpdateService
- [ ] T099 [US5] Create PriceAlertController with CRUD endpoints in backend/src/main/java/com/halaltsx/controller/PriceAlertController.java
- [ ] T100 [US5] Add Flyway migration for price_alerts table in backend/src/main/resources/db/migration/V3__price_alerts.sql

### Frontend Implementation for US5 (Optional)

- [ ] T101 [P] [US5] Create usePriceAlerts hook in frontend/src/hooks/usePriceAlerts.ts
- [ ] T102 [US5] Create SetAlertModal component in frontend/src/components/Alerts/SetAlertModal.tsx
- [ ] T103 [US5] Create AlertList component in frontend/src/components/Alerts/AlertList.tsx
- [ ] T104 [US5] Add Set Alert button to StockDetail component
- [ ] T105 [US5] Create AlertsPage for managing all alerts in frontend/src/pages/AlertsPage.tsx
- [ ] T106 [US5] Add browser notification support for triggered alerts

**Checkpoint**: User can set, view, edit, and delete price alerts with notifications

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T107 [P] Add Swagger/OpenAPI documentation to Spring Boot in backend/src/main/java/com/halaltsx/config/SwaggerConfig.java
- [ ] T108 [P] Add request logging middleware in backend
- [ ] T109 [P] Implement circuit breaker for Alpha Vantage calls using Resilience4j
- [ ] T110 [P] Add application-level caching for stock data using Spring Cache
- [ ] T111 [P] Add rate limiting for API endpoints
- [ ] T112 Create loading skeletons for frontend components
- [ ] T113 Add error boundary component for frontend error handling
- [ ] T114 Implement responsive design for mobile viewports
- [ ] T115 Add data staleness indicator to all price displays
- [ ] T116 Run quickstart.md validation to ensure setup documentation is accurate
- [ ] T117 [P] Create CacheConfig with Spring Cache for stock data TTL management in backend/src/main/java/com/halaltsx/config/CacheConfig.java
- [ ] T118 Add fallback UI state to HomePage for API errors showing cached data with warning banner
- [ ] T119 Ensure all stock-related API endpoints include DataFreshness metadata in responses

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **Polish (Phase 8)**: Depends on at least US1 being complete; can run in parallel with later stories

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - **MVP**
- **User Story 2 (P2)**: Can start after Foundational - Integrates with US1 stock list but independently testable
- **User Story 3 (P3)**: Can start after Foundational - Uses compliance logic from US1 but adds detail view
- **User Story 4 (P4)**: Can start after Foundational - Completely independent educational content
- **User Story 5 (P5)**: Can start after Foundational - Optional, independent alerts feature

### Within Each User Story

- Backend DTOs before services
- Services before controllers
- Controllers before frontend hooks
- Frontend hooks before components
- Components before pages

### Parallel Opportunities

**Phase 1 Setup** (all can run in parallel):
- T003, T004, T005, T006

**Phase 2 Foundational** (parallelizable groups):
- Config: T009, T010
- Entities: T012, T013, T014, T015
- Repositories: T016, T017, T018, T019
- DTOs: T021, T022
- Frontend: T027, T028, T030, T031

**User Story Phases** (within each story):
- Backend DTOs marked [P] can run in parallel
- Frontend hooks marked [P] can run in parallel
- Different user stories can be worked on in parallel by different developers

---

## Parallel Example: User Story 1 Backend

```bash
# Launch all DTOs for User Story 1 together:
Task: "Create StockDto in backend/src/main/java/com/halaltsx/dto/StockDto.java"
Task: "Create StockSummaryDto in backend/src/main/java/com/halaltsx/dto/StockSummaryDto.java"
Task: "Create StockListResponse in backend/src/main/java/com/halaltsx/dto/StockListResponse.java"
```

## Parallel Example: User Story 1 Frontend

```bash
# Launch hooks in parallel:
Task: "Create useStocks hook in frontend/src/hooks/useStocks.ts"
Task: "Create usePriceUpdates hook in frontend/src/hooks/usePriceUpdates.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 - View Halal Stock List
4. **STOP and VALIDATE**: Test stock list displays with prices and compliance status
5. Deploy/demo if ready - users can view Halal-compliant TSX stocks

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → Deploy (MVP: view stock list)
3. Add User Story 2 → Test → Deploy (search and filter)
4. Add User Story 3 → Test → Deploy (stock details with charts)
5. Add User Story 4 → Test → Deploy (educational content)
6. Add User Story 5 → Test → Deploy (optional: price alerts)

### Parallel Team Strategy

With multiple developers after Foundational phase completes:
- Developer A: User Story 1 backend + frontend
- Developer B: User Story 2 (can start backend while A does frontend)
- Developer C: User Story 4 (completely independent educational content)

---

## Summary

| Phase | Story | Task Count | Parallel Tasks |
|-------|-------|------------|----------------|
| Phase 1: Setup | - | 6 | 4 |
| Phase 2: Foundational | - | 25 | 18 |
| Phase 3: US1 View Stock List | P1 MVP | 21 | 8 |
| Phase 4: US2 Search/Filter | P2 | 14 | 5 |
| Phase 5: US3 Stock Details | P3 | 19 | 7 |
| Phase 6: US4 Education | P4 | 9 | 3 |
| Phase 7: US5 Alerts (Optional) | P5 | 13 | 4 |
| Phase 8: Polish | - | 13 | 6 |
| **Total** | | **120** | **55** |

**Suggested MVP Scope**: Complete Phase 1, 2, and 3 (User Story 1) for a functional Halal stock list viewer with 52 tasks.

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [US#] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- User Story 5 is optional for v1 per spec.md
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
