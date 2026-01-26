import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import StockCard from './StockCard';
import {
  createMockStock,
  createMockStockWithNulls,
  createMockNonCompliantStock,
  createMockUnverifiedStock,
  createMockPurificationStock,
} from '@/test/mocks';

// Additional edge case stocks for thorough null testing
const createStockWithOnlyNullPriceChange = () => createMockStock({
  id: 100,
  priceChange: null,
  priceChangePercent: null,
});

const createStockWithZeroPriceChange = () => createMockStock({
  id: 101,
  priceChange: 0,
  priceChangePercent: 0,
});

describe('StockCard', () => {
  describe('rendering with complete data', () => {
    it('renders stock symbol and name', () => {
      const stock = createMockStock();
      render(<StockCard stock={stock} />);

      expect(screen.getByText('TEST.TO')).toBeInTheDocument();
      expect(screen.getByText('Test Company Inc.')).toBeInTheDocument();
    });

    it('renders formatted price', () => {
      const stock = createMockStock({ currentPrice: 123.45 });
      render(<StockCard stock={stock} />);

      expect(screen.getByText('$123.45')).toBeInTheDocument();
    });

    it('renders price change percentage with plus sign for positive changes', () => {
      const stock = createMockStock({ priceChangePercent: 2.56 });
      render(<StockCard stock={stock} />);

      expect(screen.getByText('+2.56%')).toBeInTheDocument();
    });

    it('renders price change percentage without plus sign for negative changes', () => {
      const stock = createMockNonCompliantStock();
      render(<StockCard stock={stock} />);

      expect(screen.getByText('-1.96%')).toBeInTheDocument();
    });

    it('renders sector', () => {
      const stock = createMockStock({ sector: 'Technology' });
      render(<StockCard stock={stock} />);

      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('renders formatted market cap in billions', () => {
      const stock = createMockStock({ marketCap: 5000000000 });
      render(<StockCard stock={stock} />);

      expect(screen.getByText('$5.00B')).toBeInTheDocument();
    });

    it('renders formatted market cap in trillions', () => {
      const stock = createMockStock({ marketCap: 1500000000000 });
      render(<StockCard stock={stock} />);

      expect(screen.getByText('$1.50T')).toBeInTheDocument();
    });

    it('renders formatted market cap in millions', () => {
      const stock = createMockStock({ marketCap: 500000000 });
      render(<StockCard stock={stock} />);

      expect(screen.getByText('$500.00M')).toBeInTheDocument();
    });
  });

  describe('rendering with null values', () => {
    it('does not crash when priceChange is null', () => {
      const stock = createMockStockWithNulls();
      expect(() => render(<StockCard stock={stock} />)).not.toThrow();
    });

    it('does not crash when priceChangePercent is null', () => {
      const stock = createMockStockWithNulls();
      expect(() => render(<StockCard stock={stock} />)).not.toThrow();
    });

    it('does not call toFixed on null priceChangePercent', () => {
      const stock = createStockWithOnlyNullPriceChange();
      // This should not throw "Cannot read properties of null (reading 'toFixed')"
      expect(() => render(<StockCard stock={stock} />)).not.toThrow();
    });

    it('does not render price change when priceChangePercent is null', () => {
      const stock = createMockStockWithNulls();
      render(<StockCard stock={stock} />);

      expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
    });

    it('renders price change when priceChangePercent is 0', () => {
      const stock = createStockWithZeroPriceChange();
      render(<StockCard stock={stock} />);

      expect(screen.getByText('+0.00%')).toBeInTheDocument();
    });

    it('renders N/A for null market cap', () => {
      const stock = createMockStockWithNulls();
      render(<StockCard stock={stock} />);

      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('renders Unknown for null priceUpdatedAt', () => {
      const stock = createMockStockWithNulls();
      render(<StockCard stock={stock} />);

      expect(screen.getByText('Updated: Unknown')).toBeInTheDocument();
    });

    it('does not render sector when null', () => {
      const stock = createMockStockWithNulls();
      render(<StockCard stock={stock} />);

      // The stock has sector: null, so no sector should be displayed
      expect(screen.queryByText('Technology')).not.toBeInTheDocument();
    });

    it('handles all null optional fields without crashing', () => {
      const stock = {
        id: 999,
        symbol: 'TEST.TO',
        name: 'Test Stock',
        sector: null,
        currentPrice: 10,
        priceChange: null,
        priceChangePercent: null,
        marketCap: null,
        complianceStatus: 'COMPLIANT' as const,
        requiresPurification: false,
        priceUpdatedAt: null,
      };
      expect(() => render(<StockCard stock={stock} />)).not.toThrow();
    });
  });

  describe('compliance status indicators', () => {
    it('renders compliant indicator for compliant stocks', () => {
      const stock = createMockStock({ complianceStatus: 'COMPLIANT' });
      render(<StockCard stock={stock} />);

      expect(screen.getAllByText('Halal')).toHaveLength(1);
    });

    it('renders non-compliant indicator for non-compliant stocks', () => {
      const stock = createMockNonCompliantStock();
      render(<StockCard stock={stock} />);

      expect(screen.getAllByText('Not Halal')).toHaveLength(1);
    });

    it('renders unverified indicator for unverified stocks', () => {
      const stock = createMockUnverifiedStock();
      render(<StockCard stock={stock} />);

      expect(screen.getAllByText('Unverified')).toHaveLength(1);
    });

    it('renders purification required badge for stocks requiring purification', () => {
      const stock = createMockPurificationStock();
      render(<StockCard stock={stock} />);

      // StockCard has two ComplianceIndicators, both show the purification badge
      expect(screen.getAllByText('Purification Required').length).toBeGreaterThanOrEqual(1);
    });

    it('does not render purification badge for stocks not requiring purification', () => {
      const stock = createMockStock({ requiresPurification: false });
      render(<StockCard stock={stock} />);

      expect(screen.queryByText('Purification Required')).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('links to the correct stock detail page', () => {
      const stock = createMockStock({ symbol: 'TEST.TO' });
      render(<StockCard stock={stock} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/stock/TEST.TO');
    });

    it('properly encodes symbols with special characters', () => {
      const stock = createMockStock({ symbol: 'CTC-A.TO' });
      render(<StockCard stock={stock} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/stock/CTC-A.TO');
    });
  });
});
