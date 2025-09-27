import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationStatus = ({ location, accuracy, lastUpdated, onLocationRefresh, isRefreshing }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getAccuracyColor = (accuracy) => {
    switch (accuracy) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAccuracyIcon = (accuracy) => {
    switch (accuracy) {
      case 'high': return 'CheckCircle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const formatLastUpdated = (timestamp) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updateTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return updateTime?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card-base p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={18} className="text-primary" />
          <h4 className="font-semibold text-text-primary">Location Status</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </Button>
      </div>
      {/* Current Location */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {location?.area}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {location?.city}, {location?.state}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-3">
            <Icon 
              name={getAccuracyIcon(accuracy)} 
              size={14} 
              className={getAccuracyColor(accuracy)} 
            />
            <span className={`text-xs font-medium ${getAccuracyColor(accuracy)}`}>
              {accuracy}
            </span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLocationRefresh}
            disabled={isRefreshing}
            className="h-6 px-2 text-xs"
          >
            <Icon 
              name="RefreshCw" 
              size={12} 
              className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
            Refresh
          </Button>
        </div>
      </div>
      {/* Detailed Information */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-border space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-text-secondary">Coordinates:</span>
              <p className="font-data text-text-primary">
                {location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-text-secondary">Accuracy:</span>
              <p className="text-text-primary">
                ±{location?.accuracyRadius}m
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">GPS Signal:</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4]?.map((bar) => (
                  <div
                    key={bar}
                    className={`w-1 h-3 rounded-sm ${
                      bar <= (accuracy === 'high' ? 4 : accuracy === 'medium' ? 3 : 2)
                        ? 'bg-primary' :'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Data Source:</span>
              <span className="text-xs text-text-primary">GPS + Network</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Icon name="Search" size={12} className="mr-1" />
              Change Location
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Icon name="Settings" size={12} className="mr-1" />
              Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationStatus;