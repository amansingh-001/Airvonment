import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ForecastSummary = ({ data, selectedRange, onNavigateToRoutes, onSetAlert }) => {
  const calculateSummaryStats = () => {
    const aqiValues = data?.map(item => item?.aqi);
    const avgAQI = Math.round(aqiValues?.reduce((sum, aqi) => sum + aqi, 0) / aqiValues?.length);
    const maxAQI = Math.max(...aqiValues);
    const minAQI = Math.min(...aqiValues);
    
    const goodHours = data?.filter(item => item?.aqi <= 50)?.length;
    const moderateHours = data?.filter(item => item?.aqi > 50 && item?.aqi <= 100)?.length;
    const unhealthyHours = data?.filter(item => item?.aqi > 100)?.length;
    
    return { avgAQI, maxAQI, minAQI, goodHours, moderateHours, unhealthyHours };
  };

  const getBestTimeSlots = () => {
    return data?.filter(item => item?.aqi <= 100)?.sort((a, b) => a?.aqi - b?.aqi)?.slice(0, 3);
  };

  const getWorstTimeSlots = () => {
    return data?.filter(item => item?.aqi > 100)?.sort((a, b) => b?.aqi - a?.aqi)?.slice(0, 3);
  };

  const getOverallRecommendation = (avgAQI) => {
    if (avgAQI <= 50) {
      return {
        icon: 'CheckCircle',
        color: 'text-green-600',
        title: 'Excellent Air Quality Period',
        message: 'Perfect time for all outdoor activities including exercise and sports.',
        bgColor: 'bg-green-50'
      };
    }
    if (avgAQI <= 100) {
      return {
        icon: 'AlertCircle',
        color: 'text-orange-600',
        title: 'Moderate Air Quality Period',
        message: 'Generally acceptable for most outdoor activities with some precautions.',
        bgColor: 'bg-orange-50'
      };
    }
    if (avgAQI <= 150) {
      return {
        icon: 'AlertTriangle',
        color: 'text-orange-700',
        title: 'Unhealthy for Sensitive Groups',
        message: 'Sensitive individuals should limit prolonged outdoor activities.',
        bgColor: 'bg-orange-100'
      };
    }
    return {
      icon: 'XCircle',
      color: 'text-red-700',
      title: 'Unhealthy Air Quality Period',
      message: 'Everyone should avoid outdoor activities. Stay indoors when possible.',
      bgColor: 'bg-red-50'
    };
  };

  const stats = calculateSummaryStats();
  const bestTimes = getBestTimeSlots();
  const worstTimes = getWorstTimeSlots();
  const recommendation = getOverallRecommendation(stats?.avgAQI);

  return (
    <div className="forecast-summary space-y-6">
      {/* Overall Recommendation Card */}
      <div className={`${recommendation?.bgColor} rounded-lg border border-border p-6`}>
        <div className="flex items-start space-x-4">
          <div className={`${recommendation?.color} mt-1`}>
            <Icon name={recommendation?.icon} size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {recommendation?.title}
            </h3>
            <p className="text-text-secondary mb-4">
              {recommendation?.message}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToRoutes}
                iconName="Route"
                iconPosition="left"
              >
                Plan Safe Route
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onSetAlert}
                iconName="Bell"
                iconPosition="left"
              >
                Set Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">{stats?.avgAQI}</div>
          <div className="text-xs text-text-secondary">Average AQI</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">{stats?.maxAQI}</div>
          <div className="text-xs text-text-secondary">Peak AQI</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats?.minAQI}</div>
          <div className="text-xs text-text-secondary">Best AQI</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats?.goodHours}</div>
          <div className="text-xs text-text-secondary">Good Hours</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats?.moderateHours}</div>
          <div className="text-xs text-text-secondary">Moderate Hours</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">{stats?.unhealthyHours}</div>
          <div className="text-xs text-text-secondary">Unhealthy Hours</div>
        </div>
      </div>
      {/* Best and Worst Times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Times */}
        {bestTimes?.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
              <h4 className="text-lg font-semibold text-text-primary">Best Times for Outdoor Activities</h4>
            </div>
            <div className="space-y-3">
              {bestTimes?.map((time, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">{time?.time}</div>
                    <div className="text-sm text-text-secondary">{time?.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">AQI {time?.aqi}</div>
                    <div className="text-xs text-text-secondary">{time?.temperature}°C</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Worst Times */}
        {worstTimes?.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="AlertTriangle" size={20} className="text-red-600" />
              <h4 className="text-lg font-semibold text-text-primary">Times to Avoid Outdoor Activities</h4>
            </div>
            <div className="space-y-3">
              {worstTimes?.map((time, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">{time?.time}</div>
                    <div className="text-sm text-text-secondary">{time?.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">AQI {time?.aqi}</div>
                    <div className="text-xs text-text-secondary">{time?.temperature}°C</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Health Tips */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Heart" size={20} className="text-primary" />
          <h4 className="text-lg font-semibold text-text-primary">Health Tips for This Period</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-primary">Stay hydrated throughout the day</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-primary">Use air purifiers indoors when AQI is high</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-primary">Wear N95 masks during poor air quality</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-primary">Keep windows closed during high pollution</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-primary">Limit outdoor exercise when AQI &gt; 150</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-primary">Monitor symptoms and consult doctor if needed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastSummary;