import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeasurementTools = ({ onToolSelect, activeTool, measurements, onClearMeasurements }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tools = [
    { id: 'distance', name: 'Distance', icon: 'Ruler', description: 'Measure distance between points' },
    { id: 'area', name: 'Area', icon: 'Square', description: 'Calculate area of polygon' },
    { id: 'buffer', name: 'Buffer Zone', icon: 'Circle', description: 'Create buffer around hotspots' },
    { id: 'elevation', name: 'Elevation', icon: 'Mountain', description: 'Get elevation profile' }
  ];

  const formatDistance = (meters) => {
    if (meters < 1000) return `${meters?.toFixed(0)} m`;
    return `${(meters / 1000)?.toFixed(2)} km`;
  };

  const formatArea = (sqMeters) => {
    if (sqMeters < 10000) return `${sqMeters?.toFixed(0)} m²`;
    return `${(sqMeters / 10000)?.toFixed(2)} hectares`;
  };

  return (
    <div className="absolute bottom-20 right-4 z-10 flex flex-col items-end space-y-2">
      {/* Measurements Display */}
      {measurements?.length > 0 && (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3 w-64">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-text-primary">Measurements</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearMeasurements}
              className="h-6 w-6"
              title="Clear all measurements"
            >
              <Icon name="Trash2" size={12} />
            </Button>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin">
            {measurements?.map((measurement, index) => (
              <div key={index} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary capitalize">{measurement?.type}:</span>
                  <span className="font-data text-text-primary">
                    {measurement?.type === 'distance' 
                      ? formatDistance(measurement?.value)
                      : formatArea(measurement?.value)
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Tools Panel */}
      {isExpanded && (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3 w-64 animate-fade-in">
          <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Ruler" size={14} className="mr-2" />
            Measurement Tools
          </h4>
          
          <div className="space-y-1">
            {tools?.map((tool) => (
              <button
                key={tool?.id}
                onClick={() => onToolSelect(tool?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                  activeTool === tool?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
                }`}
                title={tool?.description}
              >
                <div className="flex items-center">
                  <Icon name={tool?.icon} size={14} className="mr-2" />
                  {tool?.name}
                </div>
                {activeTool === tool?.id && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>

          {/* Tool Instructions */}
          {activeTool && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-xs text-text-secondary">
                  {activeTool === 'distance' && 'Click on map to start measuring distance between points.'}
                  {activeTool === 'area' && 'Click to create polygon vertices. Double-click to finish.'}
                  {activeTool === 'buffer' && 'Click on a hotspot to create buffer zone around it.'}
                  {activeTool === 'elevation' && 'Click points to get elevation profile along the path.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Toggle Button */}
      <Button
        variant={isExpanded ? "default" : "outline"}
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 bg-card shadow-lg"
        title="Measurement Tools"
      >
        <Icon name="Ruler" size={20} />
      </Button>
    </div>
  );
};

export default MeasurementTools;