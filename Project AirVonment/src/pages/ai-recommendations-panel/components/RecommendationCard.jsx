import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation, onViewDetails, onExport, onImplement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-secondary text-secondary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="card-base card-interactive p-6 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-text-primary">{recommendation?.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation?.priority)}`}>
              {recommendation?.priority}
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-3">{recommendation?.description}</p>
          
          {/* Key Metrics */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-text-secondary">Expected Impact:</span>
              <span className="font-semibold text-primary">{recommendation?.expectedImpact}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-secondary" />
              <span className="text-text-secondary">Timeline:</span>
              <span className="font-semibold text-text-primary">{recommendation?.timeline}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className={getConfidenceColor(recommendation?.confidence)} />
              <span className="text-text-secondary">Confidence:</span>
              <span className={`font-semibold ${getConfidenceColor(recommendation?.confidence)}`}>
                {recommendation?.confidence}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse details" : "Expand details"}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Rationale */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="Brain" size={16} className="mr-2 text-primary" />
              AI Analysis Rationale
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">{recommendation?.rationale}</p>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="Database" size={16} className="mr-2 text-secondary" />
              Supporting Data Sources
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendation?.dataSources?.map((source, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Similar Interventions */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="MapPin" size={16} className="mr-2 text-accent" />
              Similar Successful Interventions
            </h4>
            <div className="space-y-2">
              {recommendation?.similarInterventions?.map((intervention, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div>
                    <span className="text-sm font-medium text-text-primary">{intervention?.location}</span>
                    <span className="text-xs text-text-secondary ml-2">({intervention?.year})</span>
                  </div>
                  <span className="text-sm font-semibold text-success">{intervention?.result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Steps */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="CheckSquare" size={16} className="mr-2 text-primary" />
              Implementation Steps
            </h4>
            <div className="space-y-2">
              {recommendation?.implementationSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{step?.action}</p>
                    <p className="text-xs text-text-secondary mt-1">{step?.timeline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Requirements */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2 text-warning" />
              Resource Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-muted rounded-md">
                <div className="text-xs text-text-secondary mb-1">Budget Estimate</div>
                <div className="text-sm font-semibold text-text-primary">{recommendation?.resources?.budget}</div>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <div className="text-xs text-text-secondary mb-1">Personnel</div>
                <div className="text-sm font-semibold text-text-primary">{recommendation?.resources?.personnel}</div>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <div className="text-xs text-text-secondary mb-1">Duration</div>
                <div className="text-sm font-semibold text-text-primary">{recommendation?.resources?.duration}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(recommendation?.id)}>
            <Icon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => onExport(recommendation?.id)}>
            <Icon name="Download" size={16} className="mr-2" />
            Export Brief
          </Button>
        </div>
        <Button variant="default" size="sm" onClick={() => onImplement(recommendation?.id)}>
          <Icon name="Play" size={16} className="mr-2" />
          Start Implementation
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;