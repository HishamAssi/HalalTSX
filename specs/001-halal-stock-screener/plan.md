# Implementation Plan: Halal Stock Screener for TSX

**Branch**: `001-halal-stock-screener` | **Date**: 2026-01-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-halal-stock-screener/spec.md`

## Summary

Build a web application for Muslim investors to view, filter, and analyze Halal-compliant TSX stocks. The application features a React frontend for displaying stock lists with real-time price updates, detailed compliance breakdowns, and search/filter capabilities. A Java Spring Boot backend handles stock data retrieval from Alpha Vantage API, Halal compliance calculations (business activity screening, debt ratio, liquidity ratio, income ratio), and data persistence in PostgreSQL.

## Technical Context

**Language/Version**: Java 21 (LTS) for backend, TypeScript 5.x for frontend
**Primary Dependencies**: Spring Boot 3.x, React 18.x, Alpha Vantage API client
**Storage**: PostgreSQL 16.x
**Testing**: JUnit 5 + Mockito (backend), Jest + React Testing Library (frontend)
**Target Platform**: Web browsers (modern Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (separate frontend and backend)
**Performance Goals**: Stock list loads within 3 seconds (SC-002), price updates within 60 seconds (SC-003), search results within 10 seconds (SC-001)
**Constraints**: Alpha Vantage free tier rate limits (25 requests/day for free, 75/minute for premium), 15-minute delayed quotes on free tier
**Scale/Scope**: ~500 TSX stocks, single-user or small concurrent user base initially

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verified against HalalTSX Constitution v1.0.0:

- ✅ **Principle I (Shariah Compliance Accuracy)**: AAOIFI SS 21 thresholds implemented (33% debt, 33% liquidity, 5% income)
- ✅ **Principle II (Data Transparency)**: Price timestamps, compliance screening dates, and data freshness indicators included
- ✅ **Principle III (Test Coverage)**: Unit tests for compliance calculations, E2E tests with Playwright (38 tests passing)
- ✅ **Principle IV (API-First Design)**: OpenAPI/Swagger documentation, RESTful endpoints with versioning (/api/v1)
- ✅ **Principle V (Graceful Degradation)**: Cached data fallback, sample data generation when real data unavailable

## Project Structure

### Documentation (this feature)

```text
specs/001-halal-stock-screener/
├── plan.md              # This file
├── research.md          # Phase 0 output - Alpha Vantage integration, Halal screening standards
├── data-model.md        # Phase 1 output - Entity definitions and relationships
├── quickstart.md        # Phase 1 output - Developer setup guide
├── contracts/           # Phase 1 output - OpenAPI specification
│   └── api.yaml
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
backend/
├── src/main/java/com/halaltsx/
│   ├── HalalTsxApplication.java
│   ├── config/
│   │   ├── AlphaVantageConfig.java
│   │   └── CorsConfig.java
│   ├── controller/
│   │   ├── StockController.java
│   │   └── ComplianceController.java
│   ├── model/
│   │   ├── Stock.java
│   │   ├── ComplianceResult.java
│   │   ├── FinancialMetrics.java
│   │   └── PriceHistory.java
│   ├── repository/
│   │   ├── StockRepository.java
│   │   └── ComplianceRepository.java
│   ├── service/
│   │   ├── StockService.java
│   │   ├── AlphaVantageService.java
│   │   ├── ComplianceService.java
│   │   └── PriceUpdateService.java
│   └── dto/
│       ├── StockDto.java
│       └── ComplianceDto.java
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/
│       └── V1__initial_schema.sql
├── src/test/java/com/halaltsx/
│   ├── controller/
│   ├── service/
│   └── integration/
├── pom.xml
└── Dockerfile

frontend/
├── src/
│   ├── components/
│   │   ├── StockList/
│   │   ├── StockCard/
│   │   ├── StockDetail/
│   │   ├── ComplianceBreakdown/
│   │   ├── SearchFilter/
│   │   └── PriceChart/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── StockDetailPage.tsx
│   │   └── EducationPage.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   ├── useStocks.ts
│   │   └── usePriceUpdates.ts
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── Dockerfile

docker-compose.yml
```

**Structure Decision**: Web application with separate frontend (React + Vite) and backend (Spring Boot) projects. This separation allows independent deployment, scaling, and technology evolution. The backend serves as the API layer and handles all business logic including Halal compliance calculations.

## Complexity Tracking

No constitution violations to justify. Architecture follows standard web application patterns.
