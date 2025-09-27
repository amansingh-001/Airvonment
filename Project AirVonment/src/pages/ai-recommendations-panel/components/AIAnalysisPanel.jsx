import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAnalysisPanel = ({ analysisData, onParameterChange, onRegenerate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRegenerate = async () => {
    setIsProcessing(true);
    await onRegenerate();
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'good':
        return 'text-success';
      case 'moderate':
        return 'text-warning';
      case 'poor':
        return 'text-destructive';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="card-base p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">AI Analysis Engine</h2>
            <p className="text-sm text-text-secondary">Real-time data processing and recommendation generation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-medium text-success">Active</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-6">
          {/* Current Data Inputs */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="Database" size={16} className="mr-2 text-secondary" />
              Current Data Inputs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Air Quality */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Air Quality Index</span>
                  <Icon name="Wind" size={14} className="text-text-secondary" />
                </div>
                <div className="text-lg font-bold text-text-primary">{analysisData?.currentAQI}</div>
                <div className={`text-xs font-medium ${getStatusColor(analysisData?.aqiStatus)}`}>
                  {analysisData?.aqiStatus}
                </div>
              </div>

              {/* Weather */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Weather Conditions</span>
                  <Icon name="CloudSun" size={14} className="text-text-secondary" />
                </div>
                <div className="text-lg font-bold text-text-primary">{analysisData?.temperature}°C</div>
                <div className="text-xs text-text-secondary">{analysisData?.weatherCondition}</div>
              </div>

              {/* Wind Speed */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Wind Speed</span>
                  <Icon name="Navigation" size={14} className="text-text-secondary" />
                </div>
                <div className="text-lg font-bold text-text-primary">{analysisData?.windSpeed}</div>
                <div className="text-xs text-text-secondary">km/h</div>
              </div>

              {/* Citizen Reports */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Citizen Reports</span>
                  <Icon name="Users" size={14} className="text-text-secondary" />
                </div>
                <div className="text-lg font-bold text-text-primary">{analysisData?.citizenReports}</div>
                <div className="text-xs text-text-secondary">Last 24h</div>
              </div>
            </div>
          </div>

          {/* Seasonal Trends */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="TrendingUp" size={16} className="mr-2 text-accent" />
              Seasonal Trends Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium text-text-primary mb-2">Stubble Burning Season</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full" />
                  <span className="text-sm text-text-secondary">Peak Period (Oct-Nov)</span>
                </div>
                <div className="text-xs text-text-secondary mt-1">Contributing 45% to current AQI</div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium text-text-primary mb-2">Winter Inversion</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <span className="text-sm text-text-secondary">Moderate Impact</span>
                </div>
                <div className="text-xs text-text-secondary mt-1">Temperature inversion detected</div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium text-text-primary mb-2">Festival Season</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span className="text-sm text-text-secondary">High Risk</span>
                </div>
                <div className="text-xs text-text-secondary mt-1">Firecracker usage expected</div>
              </div>
            </div>
          </div>

          {/* AI Processing Status */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="Cpu" size={16} className="mr-2 text-primary" />
              AI Processing Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-primary">Data Collection</span>
                </div>
                <span className="text-xs text-success font-medium">Complete</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-primary">Pattern Analysis</span>
                </div>
                <span className="text-xs text-success font-medium">Complete</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {isProcessing ? (
                    <Icon name="Loader2" size={16} className="text-primary animate-spin" />
                  ) : (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                  <span className="text-sm text-text-primary">Recommendation Generation</span>
                </div>
                <span className={`text-xs font-medium ${isProcessing ? 'text-primary' : 'text-success'}`}>
                  {isProcessing ? 'Processing...' : 'Complete'}
                </span>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Last updated: {new Date()?.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })} IST
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Configure Parameters
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleRegenerate}
                  loading={isProcessing}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Regenerate Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisPanel;