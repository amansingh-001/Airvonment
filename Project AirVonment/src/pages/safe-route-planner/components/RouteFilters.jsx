import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteFilters = ({ 
  activeFilter, 
  onFilterChange, 
  transportMode, 
  onTransportModeChange,
  showAdvanced,
  onToggleAdvanced 
}) => {
  const filterOptions = [
    {
      id: 'balanced',
      name: 'Balanced',
      icon: 'Scale',
      description: 'Best balance of time and air quality'
    },
    {
      id: 'fastest',
      name: 'Fastest',
      icon: 'Zap',
      description: 'Shortest travel time'
    },
    {
      id: 'cleanest',
      name: 'Cleanest Air',
      icon: 'Wind',
      description: 'Lowest pollution exposure'
    },
    {
      id: 'shortest',
      name: 'Shortest',
      icon: 'ArrowRight',
      description: 'Minimum distance'
    }
  ];

  const transportModes = [
    { id: 'walking', name: 'Walking', icon: 'PersonStanding' },
    { id: 'cycling', name: 'Cycling', icon: 'Bike' },
    { id: 'driving', name: 'Driving', icon: 'Car' },
    { id: 'transit', name: 'Transit', icon: 'Bus' }
  ];

  return (
    <div className="space-y-4">
      {/* Transport Mode Selection */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Transport Mode</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {transportModes?.map((mode) => (
            <button
              key={mode?.id}
              onClick={() => onTransportModeChange(mode?.id)}
              className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 ${
                transportMode === mode?.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={mode?.icon} size={20} className="mb-1" />
              <span className="text-xs font-medium">{mode?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Route Optimization */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Route Optimization</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => onFilterChange(filter?.id)}
              className={`flex items-center p-3 rounded-lg border text-left transition-all duration-200 ${
                activeFilter === filter?.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                activeFilter === filter?.id ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon name={filter?.icon} size={16} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{filter?.name}</div>
                <div className="text-xs opacity-75">{filter?.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Advanced Options Toggle */}
      <div className="pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          onClick={onToggleAdvanced}
          className="w-full justify-between"
        >
          Advanced Options
        </Button>
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-2">
          {/* AQI Threshold */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Maximum AQI Tolerance
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="300"
                defaultValue="150"
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-text-primary w-12">150</span>
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>Good (50)</span>
              <span>Hazardous (300)</span>
            </div>
          </div>

          {/* Avoid Options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Avoid
            </label>
            <div className="space-y-2">
              {[
                { id: 'highways', label: 'Highways', icon: 'Highway' },
                { id: 'construction', label: 'Construction Zones', icon: 'HardHat' },
                { id: 'industrial', label: 'Industrial Areas', icon: 'Factory' },
                { id: 'traffic', label: 'Heavy Traffic', icon: 'Car' }
              ]?.map((option) => (
                <label key={option?.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <Icon name={option?.icon} size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Preferences */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Departure Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Now', 'Peak Hours', 'Off-Peak']?.map((time) => (
                <button
                  key={time}
                  className="px-3 py-2 text-sm border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteFilters;