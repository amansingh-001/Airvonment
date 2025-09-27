import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthRecommendations = ({ aqiLevel, userProfile }) => {
  const getRecommendations = (aqi) => {
    if (aqi <= 50) {
      return {
        level: 'Good',
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: 'CheckCircle',
        iconColor: 'text-green-500',
        recommendations: [
          'Perfect time for outdoor activities and exercise',
          'Windows can be kept open for natural ventilation',
          'Great conditions for morning walks and jogging',
          'Children can play outdoors safely'
        ]
      };
    } else if (aqi <= 100) {
      return {
        level: 'Moderate',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: 'AlertCircle',
        iconColor: 'text-yellow-500',
        recommendations: [
          'Outdoor activities are generally safe for most people',
          'Sensitive individuals should limit prolonged outdoor exertion',
          'Consider shorter outdoor exercise sessions',
          'Monitor air quality if you have respiratory conditions'
        ]
      };
    } else if (aqi <= 150) {
      return {
        level: 'Unhealthy for Sensitive Groups',
        color: 'text-orange-700',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: 'AlertTriangle',
        iconColor: 'text-orange-500',
        recommendations: [
          'Sensitive groups should reduce outdoor activities',
          'Children and elderly should limit time outdoors',
          'Consider wearing N95 masks when going outside',
          'Keep windows closed and use air purifiers if available'
        ]
      };
    } else if (aqi <= 200) {
      return {
        level: 'Unhealthy',
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: 'XCircle',
        iconColor: 'text-red-500',
        recommendations: [
          'Everyone should avoid outdoor activities',
          'Wear N95 or P100 masks when going outside',
          'Keep all windows and doors closed',
          'Use air purifiers and avoid outdoor exercise'
        ]
      };
    } else {
      return {
        level: 'Very Unhealthy/Hazardous',
        color: 'text-purple-700',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: 'Shield',
        iconColor: 'text-purple-500',
        recommendations: [
          'Stay indoors and avoid all outdoor activities',
          'Seal gaps around doors and windows',
          'Use high-efficiency air purifiers continuously',
          'Seek medical attention if experiencing symptoms'
        ]
      };
    }
  };

  const recommendations = getRecommendations(aqiLevel);

  const getPersonalizedTips = () => {
    const tips = [];
    
    if (userProfile?.hasAsthma) {
      tips?.push('Keep rescue inhaler readily available');
    }
    
    if (userProfile?.isPregnant) {
      tips?.push('Extra precautions recommended during pregnancy');
    }
    
    if (userProfile?.age > 65) {
      tips?.push('Seniors should take additional protective measures');
    }
    
    if (userProfile?.exercisesOutdoors) {
      tips?.push('Consider indoor workout alternatives today');
    }

    return tips;
  };

  const personalizedTips = getPersonalizedTips();

  return (
    <div className={`card-base p-4 lg:p-6 ${recommendations?.bgColor} ${recommendations?.borderColor}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon name={recommendations?.icon} size={24} className={recommendations?.iconColor} />
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Health Recommendations
          </h3>
          <p className={`text-sm font-medium ${recommendations?.color}`}>
            Air Quality: {recommendations?.level}
          </p>
        </div>
      </div>
      {/* General Recommendations */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-text-primary text-sm">General Guidelines:</h4>
        <ul className="space-y-2">
          {recommendations?.recommendations?.map((rec, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={14} className={`${recommendations?.iconColor} mt-0.5 flex-shrink-0`} />
              <span className="text-sm text-text-secondary">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Personalized Tips */}
      {personalizedTips?.length > 0 && (
        <div className="pt-4 border-t border-border">
          <h4 className="font-semibold text-text-primary text-sm mb-3 flex items-center">
            <Icon name="User" size={14} className="mr-2" />
            Personalized for You:
          </h4>
          <ul className="space-y-2">
            {personalizedTips?.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Star" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Emergency Contact */}
      {aqiLevel > 200 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Phone" size={14} className="text-destructive" />
            <span className="text-text-secondary">
              Emergency health concerns? Call 
              <span className="font-semibold text-destructive ml-1">102</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecommendations;