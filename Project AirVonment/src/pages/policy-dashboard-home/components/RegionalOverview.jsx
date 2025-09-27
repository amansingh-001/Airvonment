import React from 'react';
import Icon from '../../../components/AppIcon';

const RegionalOverview = ({ regions }) => {
  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-success', bgColor: 'bg-success/10' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-accent', bgColor: 'bg-accent/10' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-destructive', bgColor: 'bg-destructive/10' };
    return { status: 'Very Unhealthy', color: 'text-destructive', bgColor: 'bg-destructive/20' };
  };

  const formatLastUpdated = (timestamp) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updateTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  };

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Regional Overview</h3>
          <p className="text-sm text-text-secondary mt-1">Current AQI across NCR regions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-text-secondary">Live Data</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions?.map((region) => {
          const aqiStatus = getAQIStatus(region?.aqi);
          
          return (
            <div key={region?.id} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-text-primary">{region?.name}</h4>
                  <p className="text-xs text-text-secondary mt-1">{region?.area}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">{region?.stations} stations</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-text-primary">{region?.aqi}</span>
                  <span className="text-sm text-text-secondary">AQI</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${aqiStatus?.bgColor} ${aqiStatus?.color}`}>
                  {aqiStatus?.status}
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">PM2.5</span>
                  <span className="font-medium text-text-primary">{region?.pm25} μg/m³</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">PM10</span>
                  <span className="font-medium text-text-primary">{region?.pm10} μg/m³</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">NO2</span>
                  <span className="font-medium text-text-primary">{region?.no2} μg/m³</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={region?.trend === 'up' ? 'TrendingUp' : region?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                    className={region?.trend === 'up' ? 'text-destructive' : region?.trend === 'down' ? 'text-success' : 'text-text-secondary'} 
                  />
                  <span className={`text-xs font-medium ${region?.trend === 'up' ? 'text-destructive' : region?.trend === 'down' ? 'text-success' : 'text-text-secondary'}`}>
                    {region?.trendValue}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {formatLastUpdated(region?.lastUpdated)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionalOverview;