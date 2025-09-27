import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherInfoCard = ({ weatherData, locationAccuracy }) => {
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions?.[Math.round(degrees / 22.5) % 16];
  };

  const getVisibilityStatus = (visibility) => {
    if (visibility >= 10) return { status: 'Excellent', color: 'text-green-600' };
    if (visibility >= 5) return { status: 'Good', color: 'text-blue-600' };
    if (visibility >= 2) return { status: 'Moderate', color: 'text-yellow-600' };
    return { status: 'Poor', color: 'text-red-600' };
  };

  const visibilityInfo = getVisibilityStatus(weatherData?.visibility);

  return (
    <div className="card-base p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Cloud" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Weather Conditions
        </h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Temperature */}
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="Thermometer" size={20} className="text-orange-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-text-primary">
            {weatherData?.temperature}°C
          </div>
          <div className="text-xs text-text-secondary">
            Temperature
          </div>
        </div>

        {/* Humidity */}
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="Droplets" size={20} className="text-blue-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-text-primary">
            {weatherData?.humidity}%
          </div>
          <div className="text-xs text-text-secondary">
            Humidity
          </div>
        </div>

        {/* Wind Speed */}
        <div className="text-center p-3 bg-muted rounded-lg col-span-2 lg:col-span-1">
          <Icon name="Wind" size={20} className="text-gray-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-text-primary">
            {weatherData?.windSpeed}
          </div>
          <div className="text-xs text-text-secondary">
            km/h {getWindDirection(weatherData?.windDirection)}
          </div>
        </div>
      </div>
      {/* Additional Weather Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Visibility</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-text-primary">
              {weatherData?.visibility} km
            </span>
            <div className={`text-xs ${visibilityInfo?.color}`}>
              {visibilityInfo?.status}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Gauge" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Pressure</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {weatherData?.pressure} hPa
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Icon name="Sun" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">UV Index</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-text-primary">
              {weatherData?.uvIndex}
            </span>
            <div className="text-xs text-text-secondary">
              {weatherData?.uvIndex <= 2 ? 'Low' : weatherData?.uvIndex <= 5 ? 'Moderate' : weatherData?.uvIndex <= 7 ? 'High' : 'Very High'}
            </div>
          </div>
        </div>
      </div>
      {/* Location Accuracy */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={14} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Location Accuracy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              locationAccuracy === 'high' ? 'bg-green-500' : 
              locationAccuracy === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-xs font-medium text-text-primary capitalize">
              {locationAccuracy}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoCard;