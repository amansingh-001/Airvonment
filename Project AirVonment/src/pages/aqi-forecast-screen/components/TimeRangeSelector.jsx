import React from 'react';
import Button from '../../../components/ui/Button';

const TimeRangeSelector = ({ selectedRange, onRangeChange, isLoading = false }) => {
  const timeRanges = [
    { value: '24h', label: '24 Hours', description: 'Next day forecast' },
    { value: '48h', label: '48 Hours', description: '2-day forecast' },
    { value: '72h', label: '72 Hours', description: '3-day forecast' }
  ];

  return (
    <div className="time-range-selector bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Forecast Period</h3>
          <p className="text-sm text-text-secondary">Select time range for AQI predictions</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={selectedRange === range?.value ? "default" : "outline"}
              size="sm"
              onClick={() => onRangeChange(range?.value)}
              disabled={isLoading}
              className="min-w-[100px]"
              title={range?.description}
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Loading indicator */}
      {isLoading && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-text-secondary">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading forecast data...</span>
        </div>
      )}
    </div>
  );
};

export default TimeRangeSelector;