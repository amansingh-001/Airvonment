import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteCard = ({ route, isSelected, onSelect, onNavigate }) => {
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600 bg-green-50';
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-50';
    if (aqi <= 150) return 'text-orange-600 bg-orange-50';
    if (aqi <= 200) return 'text-red-600 bg-red-50';
    return 'text-purple-600 bg-purple-50';
  };

  const getHealthImpact = (aqi) => {
    if (aqi <= 50) return { level: 'Good', icon: 'Heart', color: 'text-green-600' };
    if (aqi <= 100) return { level: 'Moderate', icon: 'AlertTriangle', color: 'text-yellow-600' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', icon: 'AlertCircle', color: 'text-orange-600' };
    if (aqi <= 200) return { level: 'Unhealthy', icon: 'XCircle', color: 'text-red-600' };
    return { level: 'Very Unhealthy', icon: 'Skull', color: 'text-purple-600' };
  };

  const healthImpact = getHealthImpact(route?.avgAQI);

  return (
    <div 
      className={`card-base p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={() => onSelect(route?.id)}
    >
      {/* Route Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={route?.mode} size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">{route?.name}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAQIColor(route?.avgAQI)}`}>
          AQI {route?.avgAQI}
        </div>
      </div>
      {/* Route Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">{route?.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">{route?.distance}</span>
        </div>
      </div>
      {/* Health Impact */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name={healthImpact?.icon} size={16} className={healthImpact?.color} />
        <span className={`text-sm font-medium ${healthImpact?.color}`}>
          {healthImpact?.level}
        </span>
      </div>
      {/* Route Benefits */}
      {route?.benefits && route?.benefits?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {route?.benefits?.map((benefit, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-xs text-text-secondary rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e?.stopPropagation();
            onSelect(route?.id);
          }}
        >
          {isSelected ? 'Selected' : 'Select Route'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Navigation"
          onClick={(e) => {
            e?.stopPropagation();
            onNavigate(route);
          }}
        >
          Navigate
        </Button>
      </div>
    </div>
  );
};

export default RouteCard;