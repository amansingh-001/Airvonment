import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationPanel = ({ route, onClose, onStartNavigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // Mock navigation steps
  const navigationSteps = [
    {
      id: 1,
      instruction: "Head northeast on Janpath toward Rajpath",
      distance: "0.3 km",
      duration: "2 min",
      maneuver: "straight",
      aqi: 156,
      landmarks: ["Central Park", "Jantar Mantar"]
    },
    {
      id: 2,
      instruction: "Turn right onto Rajpath",
      distance: "1.2 km",
      duration: "8 min",
      maneuver: "turn-right",
      aqi: 142,
      landmarks: ["India Gate", "National Stadium"]
    },
    {
      id: 3,
      instruction: "Continue straight through Pragati Maidan",
      distance: "0.8 km",
      duration: "5 min",
      maneuver: "straight",
      aqi: 134,
      landmarks: ["Pragati Maidan", "Supreme Court"]
    },
    {
      id: 4,
      instruction: "Turn left onto Ring Road",
      distance: "2.1 km",
      duration: "12 min",
      maneuver: "turn-left",
      aqi: 167,
      landmarks: ["ITO Bridge", "Delhi Gate"]
    },
    {
      id: 5,
      instruction: "Arrive at destination on the right",
      distance: "0.1 km",
      duration: "1 min",
      maneuver: "arrive",
      aqi: 145,
      landmarks: ["Destination"]
    }
  ];

  const getManeuverIcon = (maneuver) => {
    switch (maneuver) {
      case 'straight': return 'ArrowUp';
      case 'turn-right': return 'ArrowRight';
      case 'turn-left': return 'ArrowLeft';
      case 'arrive': return 'MapPin';
      default: return 'Navigation';
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600 bg-green-50';
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-50';
    if (aqi <= 150) return 'text-orange-600 bg-orange-50';
    if (aqi <= 200) return 'text-red-600 bg-red-50';
    return 'text-purple-600 bg-purple-50';
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    onStartNavigation && onStartNavigation(route);
  };

  const handleExternalNavigation = (app) => {
    // In real implementation, this would open external navigation apps
    console.log(`Opening ${app} navigation for route:`, route);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <Icon name={route?.mode} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{route?.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>{route?.distance}</span>
              <span>{route?.duration}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAQIColor(route?.avgAQI)}`}>
                Avg AQI {route?.avgAQI}
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Navigation Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-2 mb-4">
          <Button
            variant={isNavigating ? "outline" : "default"}
            className="flex-1"
            iconName="Navigation"
            onClick={handleStartNavigation}
          >
            {isNavigating ? 'Stop Navigation' : 'Start Navigation'}
          </Button>
          <Button variant="outline" iconName="Share" title="Share route">
            Share
          </Button>
        </div>

        {/* External Navigation Apps */}
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => handleExternalNavigation('Google Maps')}
          >
            <Icon name="Map" size={16} className="mr-1" />
            Google Maps
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => handleExternalNavigation('Apple Maps')}
          >
            <Icon name="MapPin" size={16} className="mr-1" />
            Apple Maps
          </Button>
        </div>
      </div>
      {/* Step-by-Step Directions */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4">
          <h4 className="font-semibold text-text-primary mb-3">Directions</h4>
          <div className="space-y-3">
            {navigationSteps?.map((step, index) => (
              <div
                key={step?.id}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  isNavigating && index === currentStep
                    ? 'bg-primary/5 border border-primary/20' :'hover:bg-muted/50'
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex flex-col items-center space-y-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isNavigating && index === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-secondary'
                  }`}>
                    <Icon name={getManeuverIcon(step?.maneuver)} size={16} />
                  </div>
                  {index < navigationSteps?.length - 1 && (
                    <div className="w-px h-8 bg-border" />
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-text-primary mb-1">
                    {step?.instruction}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                    <span>{step?.distance}</span>
                    <span>{step?.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAQIColor(step?.aqi)}`}>
                      AQI {step?.aqi}
                    </span>
                  </div>

                  {/* Landmarks */}
                  {step?.landmarks && step?.landmarks?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {step?.landmarks?.map((landmark, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted text-xs text-text-secondary rounded-full"
                        >
                          {landmark}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Navigation Footer */}
      {isNavigating && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-text-primary">
                Navigation Active
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(Math.min(navigationSteps?.length - 1, currentStep + 1))}
                disabled={currentStep === navigationSteps?.length - 1}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationPanel;