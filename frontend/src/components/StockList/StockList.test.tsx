import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import StockList from './StockList';
import {
  createMockStock,
  createMockStockWithNulls,
  createMockNonCompliantStock,
} from '@/test/mocks';

describe('StockList', () => {
  const defaultProps = {
    stocks: [],
    page: 0,
    totalPages: 1,
    totalElements: 0,
    onPageChange: vi.fn(),
  };

  describe('empty state', () => {
    it('renders empty state message when no stocks', () => {
      render(<StockList {...defaultProps} stocks={[]} />);
      expect(screen.getByText('No stocks found')).toBeInTheDocument();
    });

    it('renders suggestion to adjust filters', () => {
      render(<StockList {...defaultProps} stocks={[]} />);
      expect(
        screen.getByText('Try adjusting your search or filter criteria')
      ).toBeInTheDocument();
    });
  });

  describe('stock display', () => {
    it('renders all provided stocks', () => {
      const stocks = [
        createMockStock({ id: 1, symbol: 'AAA.TO' }),
        createMockStock({ id: 2, symbol: 'BBB.TO' }),
        createMockStock({ id: 3, symbol: 'CCC.TO' }),
      ];
      render(<StockList {...defaultProps} stocks={stocks} totalElements={3} />);

      expect(screen.getByText('AAA.TO')).toBeInTheDocument();
      expect(screen.getByText('BBB.TO')).toBeInTheDocument();
      expect(screen.getByText('CCC.TO')).toBeInTheDocument();
    });

    it('displays correct count of stocks', () => {
      const stocks = [
        createMockStock({ id: 1 }),
        createMockStock({ id: 2 }),
      ];
      render(<StockList {...defaultProps} stocks={stocks} totalElements={50} />);

      expect(screen.getByText('Showing 2 of 50 stocks')).toBeInTheDocument();
    });

    it('handles stocks with null values without crashing', () => {
      const stocks = [createMockStockWithNulls()];
      expect(() =>
        render(<StockList {...defaultProps} stocks={stocks} totalElements={1} />)
      ).not.toThrow();
    });

    it('renders mixed compliance status stocks', () => {
      const stocks = [
        createMockStock({ id: 1, complianceStatus: 'COMPLIANT' }),
        createMockNonCompliantStock(),
      ];
      render(<StockList {...defaultProps} stocks={stocks} totalElements={2} />);

      expect(screen.getAllByText('Halal')).toHaveLength(1);
      expect(screen.getAllByText('Not Halal')).toHaveLength(1);
    });
  });

  describe('pagination', () => {
    it('does not render pagination when only one page', () => {
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          totalPages={1}
          totalElements={1}
        />
      );

      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    it('renders pagination when multiple pages', () => {
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          totalPages={3}
          totalElements={60}
        />
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables Previous button on first page', () => {
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          page={0}
          totalPages={3}
          totalElements={60}
        />
      );

      expect(screen.getByText('Previous')).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          page={2}
          totalPages={3}
          totalElements={60}
        />
      );

      expect(screen.getByText('Next')).toBeDisabled();
    });

    it('calls onPageChange when clicking Next', () => {
      const onPageChange = vi.fn();
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          page={0}
          totalPages={3}
          totalElements={60}
          onPageChange={onPageChange}
        />
      );

      fireEvent.click(screen.getByText('Next'));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange when clicking Previous', () => {
      const onPageChange = vi.fn();
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          page={1}
          totalPages={3}
          totalElements={60}
          onPageChange={onPageChange}
        />
      );

      fireEvent.click(screen.getByText('Previous'));
      expect(onPageChange).toHaveBeenCalledWith(0);
    });

    it('calls onPageChange when clicking page number', () => {
      const onPageChange = vi.fn();
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          page={0}
          totalPages={3}
          totalElements={60}
          onPageChange={onPageChange}
        />
      );

      fireEvent.click(screen.getByText('2'));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('highlights current page', () => {
      const stocks = [createMockStock()];
      render(
        <StockList
          {...defaultProps}
          stocks={stocks}
          page={1}
          totalPages={3}
          totalElements={60}
        />
      );

      const currentPageButton = screen.getByText('2');
      expect(currentPageButton).toHaveClass('bg-green-600');
    });
  });
});
