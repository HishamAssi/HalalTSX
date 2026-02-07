import { Link, useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import DataModeIndicator from '@/components/DataMode/DataModeIndicator';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-green-600">HalalTSX</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Stocks
              </Link>
              <Link
                to="/education"
                className={`text-sm font-medium transition-colors ${
                  isActive('/education')
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Learn
              </Link>
              <DataModeIndicator />
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/')
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Stocks
                </Link>
                <Link
                  to="/education"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/education')
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Learn
                </Link>
                <div className="px-3 py-2">
                  <DataModeIndicator />
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              HalalTSX - Halal Stock Screener for the Toronto Stock Exchange
            </p>
            <p className="text-xs text-gray-400">
              Data provided by Alpha Vantage. Screening based on AAOIFI standards.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
