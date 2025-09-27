import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'report': return 'AlertTriangle';
      case 'alert': return 'Bell';
      case 'simulation': return 'Brain';
      case 'update': return 'RefreshCw';
      default: return 'Info';
    }
  };

  const getActivityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-destructive/10 text-destructive',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-success/10 text-success'
    };
    
    return colors?.[priority] || 'bg-muted text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return activityTime?.toLocaleDateString();
  };

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.priority)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-text-primary leading-tight">
                  {activity?.title}
                </p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(activity?.priority)}`}>
                  {activity?.priority}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                {activity?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  {formatTimestamp(activity?.timestamp)}
                </span>
                {activity?.location && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">{activity?.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;