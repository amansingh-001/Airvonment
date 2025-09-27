import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapControls = ({ 
  onLayerToggle, 
  onFilterChange, 
  onZoomIn, 
  onZoomOut, 
  onResetView,
  activeLayer,
  filters 
}) => {
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);

  const mapLayers = [
    { id: 'satellite', name: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', name: 'Terrain', icon: 'Mountain' },
    { id: 'aqi', name: 'AQI Overlay', icon: 'Wind' },
    { id: 'fire', name: 'Fire Hotspots', icon: 'Flame' }
  ];

  const filterOptions = [
    { id: 'high-confidence', name: 'High Confidence', type: 'confidence' },
    { id: 'medium-confidence', name: 'Medium Confidence', type: 'confidence' },
    { id: 'today', name: 'Today', type: 'date' },
    { id: 'week', name: 'This Week', type: 'date' },
    { id: 'stubble', name: 'Stubble Burning', type: 'source' },
    { id: 'industrial', name: 'Industrial', type: 'source' }
  ];

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
      {/* Zoom Controls */}
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="w-10 h-10 rounded-none border-b border-border"
          title="Zoom In"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="w-10 h-10 rounded-none"
          title="Zoom Out"
        >
          <Icon name="Minus" size={16} />
        </Button>
      </div>
      {/* Layer Controls Toggle */}
      <Button
        variant={isControlsExpanded ? "default" : "outline"}
        size="icon"
        onClick={() => setIsControlsExpanded(!isControlsExpanded)}
        className="w-10 h-10 bg-card shadow-lg"
        title="Layer Controls"
      >
        <Icon name="Layers" size={16} />
      </Button>
      {/* Expanded Controls Panel */}
      {isControlsExpanded && (
        <div className="bg-card border border-border rounded-lg shadow-lg p-4 w-64 animate-fade-in">
          {/* Layer Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Layers" size={14} className="mr-2" />
              Map Layers
            </h3>
            <div className="space-y-2">
              {mapLayers?.map((layer) => (
                <button
                  key={layer?.id}
                  onClick={() => onLayerToggle(layer?.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                    activeLayer === layer?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon name={layer?.icon} size={14} className="mr-2" />
                    {layer?.name}
                  </div>
                  {activeLayer === layer?.id && (
                    <Icon name="Check" size={14} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Filter" size={14} className="mr-2" />
              Filters
            </h3>
            <div className="space-y-2">
              {filterOptions?.map((filter) => (
                <label
                  key={filter?.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters?.[filter?.id] || false}
                    onChange={(e) => onFilterChange(filter?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{filter?.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetView}
              className="w-full"
            >
              <Icon name="RotateCcw" size={14} className="mr-2" />
              Reset View
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapControls;