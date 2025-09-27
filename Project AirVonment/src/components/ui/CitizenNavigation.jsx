import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const CitizenNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home Dashboard',
      path: '/citizen-home-dashboard',
      icon: 'Home',
      description: 'Current air quality overview'
    },
    {
      label: 'AQI Forecast',
      path: '/aqi-forecast-screen',
      icon: 'CloudSun',
      description: 'Hourly and daily predictions'
    },
    {
      label: 'Safe Route Planner',
      path: '/safe-route-planner',
      icon: 'Route',
      description: 'Pollution-aware navigation'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className={`citizen-navigation ${className}`} role="navigation" aria-label="Citizen Mode Navigation">
      <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
        {navigationItems?.map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`nav-item group relative ${
              isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
            }`}
            aria-current={isActivePath(item?.path) ? 'page' : undefined}
            title={item?.description}
          >
            <Icon 
              name={item?.icon} 
              size={18} 
              className="mr-2 transition-transform duration-200 group-hover:scale-110" 
            />
            <span className="font-medium">{item?.label}</span>
            
            {/* Active indicator */}
            {isActivePath(item?.path) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full sm:hidden" />
            )}
          </button>
        ))}
      </div>
      {/* Mobile breadcrumb indicator */}
      <div className="sm:hidden mt-2 px-3">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Users" size={12} />
          <span>Citizen Mode</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-text-primary font-medium">
            {navigationItems?.find(item => isActivePath(item?.path))?.label || 'Dashboard'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default CitizenNavigation;