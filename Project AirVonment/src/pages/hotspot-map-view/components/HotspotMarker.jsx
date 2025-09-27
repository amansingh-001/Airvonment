import React from 'react';
import Icon from '../../../components/AppIcon';

const HotspotMarker = ({ hotspot, onClick, isSelected }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'bg-destructive';
    if (confidence >= 60) return 'bg-warning';
    return 'bg-accent';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 80) return 'AlertTriangle';
    if (confidence >= 60) return 'AlertCircle';
    return 'Info';
  };

  return (
    <div
      className={`relative cursor-pointer transform transition-all duration-200 hover:scale-110 ${
        isSelected ? 'scale-125 z-20' : 'z-10'
      }`}
      onClick={() => onClick(hotspot)}
    >
      {/* Main Marker */}
      <div
        className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getConfidenceColor(
          hotspot?.confidence
        )}`}
      >
        <Icon
          name={getConfidenceIcon(hotspot?.confidence)}
          size={16}
          color="white"
        />
      </div>
      {/* Pulse Animation for High Confidence */}
      {hotspot?.confidence >= 80 && (
        <div className="absolute inset-0 rounded-full bg-destructive opacity-30 animate-ping" />
      )}
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -inset-2 rounded-full border-2 border-primary animate-pulse" />
      )}
    </div>
  );
};

export default HotspotMarker;