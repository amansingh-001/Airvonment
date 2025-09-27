import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, icon, color = 'primary', description }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-destructive';
    if (trend === 'down') return 'text-success';
    return 'text-text-secondary';
  };

  return (
    <div className="card-base card-interactive p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-${color}/10`}>
            <Icon name={icon} size={24} className={`text-${color}`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
            <p className="text-xs text-text-secondary mt-1">{description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-text-primary">{value}</span>
        <span className="text-sm text-text-secondary">{unit}</span>
      </div>
    </div>
  );
};

export default KPICard;