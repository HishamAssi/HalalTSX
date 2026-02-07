import { useState } from 'react';
import { useDataMode, useSwitchDataMode } from '@/hooks/useDataMode';

export default function DataModeIndicator() {
  const { data: dataMode, isLoading } = useDataMode();
  const switchMode = useSwitchDataMode();
  const [showTooltip, setShowTooltip] = useState(false);

  if (isLoading || !dataMode) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg animate-pulse">
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    );
  }

  const isTestMode = dataMode.mode === 'test';
  const canSwitch = dataMode.allowRuntimeSwitch;

  const handleSwitch = () => {
    if (!canSwitch || switchMode.isPending) return;
    const newMode = isTestMode ? 'full' : 'test';
    switchMode.mutate(newMode);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={handleSwitch}
        disabled={!canSwitch || switchMode.isPending}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
          isTestMode
            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            : 'bg-green-100 text-green-800 hover:bg-green-200'
        } ${!canSwitch ? 'cursor-default' : 'cursor-pointer'} ${
          switchMode.isPending ? 'opacity-50' : ''
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isTestMode ? 'bg-amber-500' : 'bg-green-500'
          } ${switchMode.isPending ? 'animate-pulse' : ''}`}
        />
        <span className="text-sm font-medium">
          {switchMode.isPending ? 'Switching...' : dataMode.displayName}
        </span>
        <span className="text-xs opacity-75">
          ({dataMode.stockCount.toLocaleString()} stocks)
        </span>
      </button>

      {showTooltip && (
        <div className="absolute top-full mt-2 left-0 z-50 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
          <p className="font-medium mb-1">{dataMode.displayName}</p>
          <p className="text-gray-300 text-xs mb-2">{dataMode.description}</p>
          <div className="flex justify-between text-xs">
            <span>Total Stocks:</span>
            <span className="font-medium">{dataMode.stockCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Halal Compliant:</span>
            <span className="font-medium text-green-400">
              {dataMode.compliantCount.toLocaleString()}
            </span>
          </div>
          {canSwitch && (
            <p className="mt-2 text-xs text-gray-400 border-t border-gray-700 pt-2">
              Click to switch to {isTestMode ? 'Full Scale' : 'Test'} mode
            </p>
          )}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      )}
    </div>
  );
}
