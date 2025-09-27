import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, color = 'primary', badge }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <div className="card-base card-interactive p-6 relative">
      {badge && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
            {badge}
          </span>
        </div>
      )}
      
      <div className="flex items-start space-x-4 mb-4">
        <div className={`p-3 rounded-lg bg-${color}/10 flex-shrink-0`}>
          <Icon name={icon} size={24} className={`text-${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleNavigation}
        className="w-full"
        iconName="ArrowRight"
        iconPosition="right"
      >
        Access Tool
      </Button>
    </div>
  );
};

export default QuickActionCard;