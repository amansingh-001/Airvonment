import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AQIIndicatorCard = ({ aqiData, location, onRefresh, isLoading }) => {
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-red-800';
  };

  const getAQITextColor = (aqi) => {
    if (aqi <= 50) return 'text-green-700';
    if (aqi <= 100) return 'text-yellow-700';
    if (aqi <= 150) return 'text-orange-700';
    if (aqi <= 200) return 'text-red-700';
    if (aqi <= 300) return 'text-purple-700';
    return 'text-red-900';
  };

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getHealthImpact = (aqi) => {
    if (aqi <= 50) return 'Air quality is satisfactory. Enjoy outdoor activities!';
    if (aqi <= 100) return 'Air quality is acceptable for most people. Sensitive individuals should consider limiting prolonged outdoor exertion.';
    if (aqi <= 150) return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    if (aqi <= 200) return 'Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.';
    if (aqi <= 300) return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    return 'Health alert: everyone may experience more serious health effects. Avoid outdoor activities.';
  };

  return (
    <div className="card-base card-interactive p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Wind" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Current Air Quality
            </h2>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="MapPin" size={14} />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-10 w-10"
        >
          <Icon 
            name="RefreshCw" 
            size={18} 
            className={isLoading ? 'animate-spin' : ''} 
          />
        </Button>
      </div>
      {/* AQI Display */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 rounded-full ${getAQIColor(aqiData?.current)} shadow-lg mb-4`}>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white">
              {aqiData?.current}
            </div>
            <div className="text-sm lg:text-base text-white/90 font-medium">
              AQI
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className={`text-xl lg:text-2xl font-heading font-bold ${getAQITextColor(aqiData?.current)}`}>
            {getAQICategory(aqiData?.current)}
          </h3>
          <p className="text-sm lg:text-base text-text-secondary max-w-md mx-auto leading-relaxed">
            {getHealthImpact(aqiData?.current)}
          </p>
        </div>
      </div>
      {/* Pollutant Details */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {aqiData?.pollutants?.map((pollutant) => (
          <div key={pollutant?.name} className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              {pollutant?.value}
            </div>
            <div className="text-xs text-text-secondary font-medium">
              {pollutant?.name}
            </div>
            <div className="text-xs text-text-secondary">
              {pollutant?.unit}
            </div>
          </div>
        ))}
      </div>
      {/* Last Updated */}
      <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
        <Icon name="Clock" size={12} />
        <span>Last updated: {aqiData?.lastUpdated}</span>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default AQIIndicatorCard;