import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HotspotPopup = ({ hotspot, onClose, onExport }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 80) return { level: 'High', color: 'text-destructive' };
    if (confidence >= 60) return { level: 'Medium', color: 'text-warning' };
    return { level: 'Low', color: 'text-accent' };
  };

  const confidenceInfo = getConfidenceLevel(hotspot?.confidence);

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-4 w-80 max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Flame" size={18} className="mr-2 text-destructive" />
          Fire Hotspot
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Hotspot Details */}
      <div className="space-y-3">
        {/* Location */}
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary">{hotspot?.location}</p>
            <p className="text-xs text-text-secondary font-data">
              {hotspot?.coordinates?.lat?.toFixed(4)}, {hotspot?.coordinates?.lng?.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Detection Time */}
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <div>
            <p className="text-sm text-text-primary">
              Detected: {formatTimestamp(hotspot?.detectedAt)}
            </p>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="flex items-center space-x-3">
          <Icon name="Target" size={16} className="text-text-secondary" />
          <div>
            <p className="text-sm text-text-primary">
              Confidence: 
              <span className={`ml-1 font-semibold ${confidenceInfo?.color}`}>
                {confidenceInfo?.level} ({hotspot?.confidence}%)
              </span>
            </p>
          </div>
        </div>

        {/* Affected Area */}
        <div className="flex items-center space-x-3">
          <Icon name="Circle" size={16} className="text-text-secondary" />
          <div>
            <p className="text-sm text-text-primary">
              Estimated Area: {hotspot?.affectedArea} hectares
            </p>
          </div>
        </div>

        {/* Fire Type */}
        <div className="flex items-center space-x-3">
          <Icon name="Tag" size={16} className="text-text-secondary" />
          <div>
            <p className="text-sm text-text-primary">
              Type: {hotspot?.type}
            </p>
          </div>
        </div>

        {/* Intensity */}
        <div className="flex items-center space-x-3">
          <Icon name="Thermometer" size={16} className="text-text-secondary" />
          <div>
            <p className="text-sm text-text-primary">
              Intensity: {hotspot?.intensity} MW
            </p>
          </div>
        </div>
      </div>
      {/* Status Badge */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              hotspot?.status === 'active' ? 'bg-destructive animate-pulse' : 
              hotspot?.status === 'contained' ? 'bg-warning' : 'bg-success'
            }`} />
            <span className="text-sm font-medium text-text-primary capitalize">
              {hotspot?.status}
            </span>
          </div>
          <span className="text-xs text-text-secondary">
            NASA FIRMS
          </span>
        </div>
      </div>
      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-border flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport(hotspot)}
          className="flex-1"
        >
          <Icon name="Download" size={14} className="mr-1" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Icon name="Share" size={14} className="mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default HotspotPopup;
