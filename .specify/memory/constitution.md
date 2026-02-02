<!--
Sync Impact Report
==================
Version change: 0.0.0 → 1.0.0 (MAJOR - Initial ratification)
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (5 principles)
  - Technology Standards
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (already references constitution check)
  - .specify/templates/spec-template.md ✅ (no constitution-specific gates needed)
  - .specify/templates/tasks-template.md ✅ (no constitution-specific gates needed)
Follow-up TODOs: None
-->

# HalalTSX Constitution

## Core Principles

### I. Shariah Compliance Accuracy

All Halal screening calculations MUST accurately implement AAOIFI Sharia Standards (SS 21):
- Business activity screening against prohibited industries (alcohol, pork, gambling, conventional finance, adult entertainment, weapons, tobacco)
- Debt ratio threshold: interest-bearing debt / market capitalization < 33%
- Liquidity ratio threshold: (cash + interest-bearing securities) / total assets < 33%
- Income ratio threshold: non-permissible income / total revenue < 5%
- Purification percentage MUST be calculated and displayed for compliant stocks with any non-permissible income

**Rationale**: Muslim investors rely on this application for religious compliance. Inaccurate screening could lead users to unknowingly invest in non-permissible assets, which is the core problem this application solves.

### II. Data Transparency

All displayed data MUST include clear provenance and freshness indicators:
- Price data MUST show timestamp of last update
- Compliance status MUST indicate when screening was last performed
- Data source unavailability MUST be clearly communicated to users
- Cached data MUST be labeled as such with age indication

**Rationale**: Investment decisions require trust in data accuracy. Users must understand data limitations to make informed choices.

### III. Test Coverage for Business Logic

All Halal compliance calculation code MUST have comprehensive test coverage:
- Unit tests for each screening criterion (business activity, debt ratio, liquidity ratio, income ratio)
- Edge case tests for boundary conditions (exactly 33%, exactly 5%)
- Integration tests for the complete screening pipeline
- E2E tests verifying user-facing compliance displays match backend calculations

**Rationale**: Errors in compliance logic directly impact the application's core value proposition. Untested compliance code is unacceptable.

### IV. API-First Design

Backend functionality MUST be exposed through well-documented RESTful APIs:
- OpenAPI/Swagger documentation for all endpoints
- Consistent error response formats
- Clear separation between frontend and backend concerns
- API versioning to support future evolution without breaking clients

**Rationale**: Clean API boundaries enable independent frontend/backend development, testing, and potential future mobile or third-party integrations.

### V. Graceful Degradation

The application MUST remain usable during external service failures:
- Cache stock data to serve during Alpha Vantage API outages
- Display last-known prices when real-time data unavailable
- Clearly indicate degraded state to users
- Maintain functionality for at least 24 hours of data source unavailability (SC-007)

**Rationale**: External API dependencies should not render the application unusable. Users should always be able to view their stock information.

## Technology Standards

The following technology choices are standardized for this project:

| Component | Technology | Version |
|-----------|------------|---------|
| Backend Runtime | Java | 21 (LTS) |
| Backend Framework | Spring Boot | 3.x |
| Frontend Runtime | Node.js | 18+ |
| Frontend Framework | React | 18.x |
| Frontend Build | Vite | 5.x |
| Database | PostgreSQL | 16.x |
| Backend Testing | JUnit 5 + Mockito | - |
| Frontend Testing | Vitest + React Testing Library | - |
| E2E Testing | Playwright | - |
| Containerization | Docker + Docker Compose | - |

Deviations from these standards require documented justification and constitution amendment.

## Development Workflow

### Code Quality Gates

1. **Pre-commit**: All code MUST pass linting (ESLint for frontend, compiler warnings for backend)
2. **Pre-merge**: All tests MUST pass (unit, integration, E2E)
3. **Pre-deploy**: Docker build MUST succeed

### Branch Strategy

- Feature branches named: `[###]-[feature-name]` (e.g., `001-halal-stock-screener`)
- User story branches named: `us[#]-[story-name]` (e.g., `us4-education-page`)
- All branches merge to feature branch, feature branches merge to `main`

### Documentation Requirements

- User stories MUST have acceptance scenarios before implementation
- API endpoints MUST be documented in OpenAPI format
- Complex business logic (especially compliance calculations) MUST have inline comments explaining the Islamic finance rationale

## Governance

This constitution establishes the foundational principles for the HalalTSX project. It supersedes informal practices and MUST be consulted when architectural or process decisions are made.

### Amendment Process

1. Propose amendment with rationale in a dedicated PR
2. Document impact on existing code and processes
3. Update version following semantic versioning:
   - MAJOR: Principle removal or incompatible redefinition
   - MINOR: New principle or significant expansion
   - PATCH: Clarifications and non-semantic changes
4. Update dependent templates if affected

### Compliance Review

- All PRs SHOULD reference relevant constitution principles when applicable
- Architecture decisions MUST justify any complexity against Principle V (Graceful Degradation)
- New features involving Halal calculations MUST demonstrate compliance with Principle I and III

**Version**: 1.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
