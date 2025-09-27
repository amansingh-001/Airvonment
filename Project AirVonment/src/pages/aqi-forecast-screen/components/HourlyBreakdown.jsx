import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HourlyBreakdown = ({ data, selectedRange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-orange-500';
    if (aqi <= 150) return 'bg-orange-600';
    if (aqi <= 200) return 'bg-red-700';
    if (aqi <= 300) return 'bg-purple-700';
    return 'bg-red-900';
  };

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getActivityRecommendation = (aqi) => {
    if (aqi <= 50) return { icon: 'CheckCircle', text: 'Great for outdoor activities', color: 'text-green-600' };
    if (aqi <= 100) return { icon: 'AlertCircle', text: 'Moderate outdoor activities OK', color: 'text-orange-600' };
    if (aqi <= 150) return { icon: 'AlertTriangle', text: 'Limit prolonged outdoor activities', color: 'text-orange-700' };
    if (aqi <= 200) return { icon: 'XCircle', text: 'Avoid outdoor activities', color: 'text-red-700' };
    return { icon: 'Shield', text: 'Stay indoors, use air purifier', color: 'text-red-900' };
  };

  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    return data?.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="hourly-breakdown bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-1">Hourly Breakdown</h3>
          <p className="text-sm text-text-secondary">
            Detailed AQI predictions with activity recommendations
          </p>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            <span className="text-sm text-text-secondary px-2">
              {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        )}
      </div>
      {/* Hourly Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {getCurrentPageData()?.map((hour, index) => {
          const recommendation = getActivityRecommendation(hour?.aqi);
          
          return (
            <div
              key={`${hour?.time}-${index}`}
              className="hourly-card bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Time Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-text-primary">{hour?.time}</div>
                <div className="text-xs text-text-secondary">{hour?.date}</div>
              </div>
              {/* AQI Display */}
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-4 h-4 rounded-full ${getAQIColor(hour?.aqi)}`} />
                <div>
                  <div className="text-2xl font-bold text-text-primary">{hour?.aqi}</div>
                  <div className="text-xs text-text-secondary">{getAQICategory(hour?.aqi)}</div>
                </div>
              </div>
              {/* Weather Info */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="flex items-center space-x-1">
                  <Icon name="Thermometer" size={12} className="text-text-secondary" />
                  <span className="text-text-secondary">{hour?.temperature}°C</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Droplets" size={12} className="text-text-secondary" />
                  <span className="text-text-secondary">{hour?.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Wind" size={12} className="text-text-secondary" />
                  <span className="text-text-secondary">{hour?.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} className="text-text-secondary" />
                  <span className="text-text-secondary">{hour?.visibility} km</span>
                </div>
              </div>
              {/* Activity Recommendation */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-start space-x-2">
                  <Icon name={recommendation?.icon} size={14} className={recommendation?.color} />
                  <div className="text-xs text-text-secondary leading-relaxed">
                    {recommendation?.text}
                  </div>
                </div>
              </div>
              {/* Additional Info */}
              {hour?.pollutants && (
                <div className="mt-3 pt-2 border-t border-border">
                  <div className="text-xs text-text-secondary">
                    <div className="font-medium mb-1">Main Pollutants:</div>
                    <div className="flex flex-wrap gap-1">
                      {hour?.pollutants?.map((pollutant, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted rounded text-xs"
                        >
                          {pollutant}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Summary Stats */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-bold text-text-primary">
              {Math.round(data?.reduce((sum, item) => sum + item?.aqi, 0) / data?.length)}
            </div>
            <div className="text-xs text-text-secondary">Average AQI</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-text-primary">
              {Math.max(...data?.map(item => item?.aqi))}
            </div>
            <div className="text-xs text-text-secondary">Peak AQI</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-text-primary">
              {Math.min(...data?.map(item => item?.aqi))}
            </div>
            <div className="text-xs text-text-secondary">Best AQI</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-green-600">
              {data?.filter(item => item?.aqi <= 100)?.length}
            </div>
            <div className="text-xs text-text-secondary">Good Hours</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyBreakdown;