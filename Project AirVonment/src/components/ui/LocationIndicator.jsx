import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationIndicator = ({ className = '', showDetails = false }) => {
  const [location, setLocation] = useState({
    city: 'Delhi NCR',
    area: 'Connaught Place',
    coordinates: { lat: 28.6139, lng: 77.2090 }
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleLocationRefresh = () => {
    // Simulate location refresh
    setLastUpdated(new Date());
    // In real app, this would trigger geolocation API
  };

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date?.toLocaleDateString();
  };

  return (
    <div className={`location-indicator ${className}`}>
      {/* Compact View */}
      <div className="flex items-center space-x-2">
        <div 
          className={`flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg cursor-pointer transition-colors duration-200 hover:bg-muted/80 ${
            showDetails ? 'cursor-default' : ''
          }`}
          onClick={() => !showDetails && setIsExpanded(!isExpanded)}
        >
          <Icon 
            name="MapPin" 
            size={16} 
            className="text-primary flex-shrink-0" 
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-text-primary truncate">
              {location?.city}
            </span>
            {showDetails && (
              <span className="text-xs text-text-secondary truncate">
                {location?.area}
              </span>
            )}
          </div>
          
          {!showDetails && (
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="text-text-secondary flex-shrink-0" 
            />
          )}
        </div>

        {showDetails && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLocationRefresh}
            className="h-8 w-8"
            title="Refresh location"
          >
            <Icon name="RefreshCw" size={14} />
          </Button>
        )}
      </div>
      {/* Expanded Details */}
      {(isExpanded || showDetails) && (
        <div className="mt-2 p-3 bg-card rounded-lg border border-border shadow-sm animate-fade-in">
          <div className="space-y-3">
            {/* Location Details */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-text-primary">Current Location</h4>
                {!showDetails && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLocationRefresh}
                    className="h-6 px-2"
                  >
                    <Icon name="RefreshCw" size={12} className="mr-1" />
                    Refresh
                  </Button>
                )}
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Building" size={12} className="text-text-secondary" />
                  <span className="text-text-primary font-medium">{location?.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={12} className="text-text-secondary" />
                  <span className="text-text-secondary">{location?.area}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Navigation" size={12} className="text-text-secondary" />
                  <span className="text-text-secondary font-data text-xs">
                    {location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-text-secondary">Location active</span>
                </div>
                <span className="text-text-secondary">
                  Updated {formatLastUpdated(lastUpdated)}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            {showDetails && (
              <div className="pt-2 border-t border-border">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Search" size={12} className="mr-1" />
                    Change Location
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Settings" size={12} className="mr-1" />
                    Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationIndicator;