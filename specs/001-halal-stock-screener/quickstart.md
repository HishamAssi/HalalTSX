# Quickstart Guide: Halal Stock Screener for TSX

**Branch**: `001-halal-stock-screener` | **Date**: 2026-01-25

## Prerequisites

- **Java 21** (LTS) - [Download](https://adoptium.net/)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **PostgreSQL 16** - [Download](https://www.postgresql.org/download/)
- **Docker** (optional) - For containerized development
- **Alpha Vantage API Key** - [Get free key](https://www.alphavantage.co/support/#api-key)

## Quick Setup

### Option 1: Docker Compose (Recommended)

```bash
# Clone and navigate to project
cd HalalTSX

# Create environment file
cp .env.example .env
# Edit .env and add your ALPHA_VANTAGE_API_KEY

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api/v1
# API Docs: http://localhost:8080/swagger-ui.html
```

### Option 2: Manual Setup

#### 1. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE halaltsx;"
psql -U postgres -c "CREATE USER halaltsx WITH PASSWORD 'halaltsx';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE halaltsx TO halaltsx;"
```

#### 2. Backend Setup

```bash
cd backend

# Copy environment configuration
cp src/main/resources/application-local.yml.example src/main/resources/application-local.yml

# Edit application-local.yml with your settings:
# - Database connection (if different from defaults)
# - Alpha Vantage API key

# Run with Maven
./mvnw spring-boot:run -Dspring-boot.run.profiles=local

# Or build and run JAR
./mvnw clean package
java -jar target/halaltsx-backend-1.0.0.jar --spring.profiles.active=local
```

Backend will start at `http://localhost:8080`

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local if API URL differs from default

# Start development server
npm run dev
```

Frontend will start at `http://localhost:3000`

## Environment Variables

### Backend (application.yml)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/halaltsx
    username: halaltsx
    password: halaltsx

alphavantage:
  api-key: ${ALPHA_VANTAGE_API_KEY:your-api-key-here}
  base-url: https://www.alphavantage.co/query
  rate-limit:
    requests-per-minute: 5  # Free tier: 5/min
```

### Frontend (.env.local)

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Development Workflow

### Running Tests

```bash
# Backend tests
cd backend
./mvnw test                    # Unit tests
./mvnw verify                  # Integration tests

# Frontend tests
cd frontend
npm test                       # Unit tests
npm run test:coverage          # With coverage report
```

### Code Style

```bash
# Backend - Checkstyle
cd backend
./mvnw checkstyle:check

# Frontend - ESLint + Prettier
cd frontend
npm run lint
npm run format
```

### Database Migrations

Migrations are managed by Flyway and run automatically on startup.

```bash
# Create new migration
# Add file: backend/src/main/resources/db/migration/V{version}__{description}.sql

# Check migration status
./mvnw flyway:info

# Force migration (development only)
./mvnw flyway:repair
./mvnw flyway:migrate
```

## API Documentation

When the backend is running:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## Project Structure

```
HalalTSX/
├── backend/
│   ├── src/main/java/com/halaltsx/
│   │   ├── controller/      # REST endpoints
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access
│   │   ├── model/           # JPA entities
│   │   └── dto/             # API transfer objects
│   ├── src/main/resources/
│   │   ├── application.yml  # Configuration
│   │   └── db/migration/    # Flyway migrations
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── specs/                   # Feature specifications
├── docker-compose.yml
└── .env.example
```

## Common Tasks

### Seed Initial Stock Data

```bash
# After backend is running, trigger initial data load
curl -X POST http://localhost:8080/api/v1/admin/seed

# Or run the seed script
cd backend
./mvnw exec:java -Dexec.mainClass="com.halaltsx.seed.StockDataSeeder"
```

### Update Stock Prices Manually

```bash
curl -X POST http://localhost:8080/api/v1/admin/refresh-prices
```

### View Application Logs

```bash
# Docker
docker-compose logs -f backend

# Local
tail -f backend/logs/halaltsx.log
```

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Check connection
psql -h localhost -U halaltsx -d halaltsx -c "SELECT 1;"
```

### Alpha Vantage Rate Limits

The free tier allows 25 API calls per day. If you hit rate limits:
1. Check logs for "rate limit exceeded" errors
2. Wait for daily reset (midnight ET)
3. Consider premium API key for development

### CORS Issues

If frontend can't reach backend, verify:
1. Backend CORS config includes `http://localhost:3000`
2. API base URL in frontend `.env.local` is correct
3. No proxy conflicts

## Next Steps

1. Get an Alpha Vantage API key and configure it
2. Run the database migrations
3. Seed initial stock data
4. Start developing!

See the [API Contract](./contracts/api.yaml) for endpoint specifications.
