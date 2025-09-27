import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const PolicyNavigation = ({ isCollapsed = false, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      label: 'Dashboard Home',
      path: '/policy-dashboard-home',
      icon: 'BarChart3',
      description: 'Administrative overview and metrics'
    },
    {
      label: 'Hotspot Map View',
      path: '/hotspot-map-view',
      icon: 'Map',
      description: 'Geographic pollution analysis'
    },
    {
      label: 'AI Recommendations',
      path: '/ai-recommendations-panel',
      icon: 'Brain',
      description: 'Intelligent policy insights'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav 
      className={`policy-navigation ${className}`} 
      role="navigation" 
      aria-label="Policy Mode Navigation"
    >
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block">
        <div className="flex flex-col space-y-1">
          {/* Mode Indicator */}
          <div className="flex items-center px-3 py-2 mb-4 bg-secondary/10 rounded-lg">
            <Icon name="Building2" size={16} className="text-secondary mr-2" />
            {!isCollapsed && (
              <span className="text-sm font-medium text-secondary">Policy Mode</span>
            )}
          </div>

          {/* Navigation Items */}
          {navigationItems?.map((item) => (
            <div
              key={item?.path}
              className="relative"
              onMouseEnter={() => setHoveredItem(item?.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => handleNavigation(item?.path)}
                className={`w-full nav-item justify-start ${
                  isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
                }`}
                aria-current={isActivePath(item?.path) ? 'page' : undefined}
                title={isCollapsed ? item?.label : item?.description}
              >
                <Icon name={item?.icon} size={18} className="flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 font-medium truncate">{item?.label}</span>
                )}
                
                {/* Active indicator */}
                {isActivePath(item?.path) && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full" />
                )}
              </button>

              {/* Tooltip for collapsed state */}
              {isCollapsed && hoveredItem === item?.path && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border border-border whitespace-nowrap">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs text-text-secondary mt-1">{item?.description}</div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Mobile/Tablet Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-thin pb-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-item flex-shrink-0 ${
                isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
              }`}
              aria-current={isActivePath(item?.path) ? 'page' : undefined}
            >
              <Icon name={item?.icon} size={18} className="mr-2" />
              <span className="font-medium whitespace-nowrap">{item?.label}</span>
            </button>
          ))}
        </div>
        
        {/* Mobile breadcrumb */}
        <div className="mt-3 px-3">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Building2" size={12} />
            <span>Policy Mode</span>
            <Icon name="ChevronRight" size={12} />
            <span className="text-text-primary font-medium">
              {navigationItems?.find(item => isActivePath(item?.path))?.label || 'Dashboard'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PolicyNavigation;