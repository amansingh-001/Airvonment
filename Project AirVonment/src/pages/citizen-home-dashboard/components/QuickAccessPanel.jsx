import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessPanel = ({ aqiLevel }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'forecast',
      title: 'AQI Forecast',
      description: '24-72 hour predictions',
      icon: 'CloudSun',
      path: '/aqi-forecast-screen',
      color: 'bg-blue-500',
      textColor: 'text-blue-700'
    },
    {
      id: 'routes',
      title: 'Safe Routes',
      description: 'Pollution-aware navigation',
      icon: 'Route',
      path: '/safe-route-planner',
      color: 'bg-green-500',
      textColor: 'text-green-700'
    },
    {
      id: 'report',
      title: 'Report Pollution',
      description: 'Help improve air quality',
      icon: 'AlertTriangle',
      path: '/pollution-reporting',
      color: 'bg-orange-500',
      textColor: 'text-orange-700'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Quick Actions
        </h3>
      </div>
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className="card-base card-interactive p-4 cursor-pointer group"
            onClick={() => handleNavigation(action?.path)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`flex items-center justify-center w-12 h-12 ${action?.color} rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={24} className="text-white" />
              </div>
              <div>
                <h4 className={`font-semibold ${action?.textColor} mb-1`}>
                  {action?.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {action?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile Stack Layout */}
      <div className="md:hidden space-y-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            className="w-full h-auto p-4 justify-start"
            onClick={() => handleNavigation(action?.path)}
          >
            <div className={`flex items-center justify-center w-10 h-10 ${action?.color} rounded-lg mr-4 flex-shrink-0`}>
              <Icon name={action?.icon} size={20} className="text-white" />
            </div>
            <div className="text-left flex-1">
              <div className={`font-semibold ${action?.textColor} text-base`}>
                {action?.title}
              </div>
              <div className="text-sm text-text-secondary">
                {action?.description}
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary ml-2" />
          </Button>
        ))}
      </div>
      {/* Emergency Banner */}
      {aqiLevel > 200 && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-destructive mb-1">
                Health Alert
              </h4>
              <p className="text-sm text-destructive/80">
                Air quality is unhealthy. Avoid outdoor activities and keep windows closed. Consider using air purifiers indoors.
              </p>
              <Button
                variant="destructive"
                size="sm"
                className="mt-3"
                onClick={() => handleNavigation('/health-recommendations')}
              >
                <Icon name="Heart" size={14} className="mr-1" />
                Health Tips
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccessPanel;
