import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import ComplianceIndicator from './ComplianceIndicator';

describe('ComplianceIndicator', () => {
  describe('compliance status display', () => {
    it('renders "Halal" for COMPLIANT status', () => {
      render(<ComplianceIndicator status="COMPLIANT" />);
      expect(screen.getByText('Halal')).toBeInTheDocument();
    });

    it('renders "Not Halal" for NON_COMPLIANT status', () => {
      render(<ComplianceIndicator status="NON_COMPLIANT" />);
      expect(screen.getByText('Not Halal')).toBeInTheDocument();
    });

    it('renders "Unverified" for UNABLE_TO_VERIFY status', () => {
      render(<ComplianceIndicator status="UNABLE_TO_VERIFY" />);
      expect(screen.getByText('Unverified')).toBeInTheDocument();
    });
  });

  describe('purification badge', () => {
    it('shows purification badge when requiresPurification is true and status is COMPLIANT', () => {
      render(<ComplianceIndicator status="COMPLIANT" requiresPurification={true} />);
      expect(screen.getByText('Purification Required')).toBeInTheDocument();
    });

    it('does not show purification badge when requiresPurification is false', () => {
      render(<ComplianceIndicator status="COMPLIANT" requiresPurification={false} />);
      expect(screen.queryByText('Purification Required')).not.toBeInTheDocument();
    });

    it('does not show purification badge for NON_COMPLIANT even if requiresPurification is true', () => {
      render(<ComplianceIndicator status="NON_COMPLIANT" requiresPurification={true} />);
      expect(screen.queryByText('Purification Required')).not.toBeInTheDocument();
    });

    it('does not show purification badge for UNABLE_TO_VERIFY even if requiresPurification is true', () => {
      render(<ComplianceIndicator status="UNABLE_TO_VERIFY" requiresPurification={true} />);
      expect(screen.queryByText('Purification Required')).not.toBeInTheDocument();
    });
  });

  describe('showLabel prop', () => {
    it('shows label by default', () => {
      render(<ComplianceIndicator status="COMPLIANT" />);
      expect(screen.getByText('Halal')).toBeInTheDocument();
    });

    it('shows label when showLabel is true', () => {
      render(<ComplianceIndicator status="COMPLIANT" showLabel={true} />);
      expect(screen.getByText('Halal')).toBeInTheDocument();
    });

    it('hides label when showLabel is false', () => {
      render(<ComplianceIndicator status="COMPLIANT" showLabel={false} />);
      expect(screen.queryByText('Halal')).not.toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('renders without crashing for sm size', () => {
      expect(() =>
        render(<ComplianceIndicator status="COMPLIANT" size="sm" />)
      ).not.toThrow();
    });

    it('renders without crashing for md size', () => {
      expect(() =>
        render(<ComplianceIndicator status="COMPLIANT" size="md" />)
      ).not.toThrow();
    });

    it('renders without crashing for lg size', () => {
      expect(() =>
        render(<ComplianceIndicator status="COMPLIANT" size="lg" />)
      ).not.toThrow();
    });
  });
});
