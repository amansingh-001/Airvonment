import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScenarioAnalysisModal = ({ isOpen, onClose, onAnalyze }) => {
  const [scenario, setScenario] = useState({
    name: '',
    description: '',
    interventions: [],
    timeline: '30',
    targetAQI: '100',
    weatherConditions: 'current',
    seasonalFactors: 'current'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const interventionOptions = [
    { value: 'odd_even', label: 'Odd-Even Vehicle Scheme' },
    { value: 'construction_ban', label: 'Construction Activity Ban' },
    { value: 'firecracker_ban', label: 'Firecracker Ban' },
    { value: 'industrial_shutdown', label: 'Industrial Shutdown' },
    { value: 'water_spraying', label: 'Water Spraying on Roads' },
    { value: 'stubble_burning_control', label: 'Stubble Burning Control' },
    { value: 'public_transport_free', label: 'Free Public Transport' },
    { value: 'work_from_home', label: 'Work from Home Advisory' }
  ];

  const weatherOptions = [
    { value: 'current', label: 'Current Weather Conditions' },
    { value: 'favorable', label: 'Favorable (High Wind Speed)' },
    { value: 'unfavorable', label: 'Unfavorable (Low Wind, High Humidity)' },
    { value: 'extreme', label: 'Extreme (No Wind, Temperature Inversion)' }
  ];

  const seasonalOptions = [
    { value: 'current', label: 'Current Seasonal Factors' },
    { value: 'peak_stubble', label: 'Peak Stubble Burning Season' },
    { value: 'festival_season', label: 'Festival Season' },
    { value: 'winter_peak', label: 'Winter Peak Pollution' },
    { value: 'summer_dust', label: 'Summer Dust Storms' }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await onAnalyze(scenario);
    setTimeout(() => {
      setIsAnalyzing(false);
      onClose();
    }, 3000);
  };

  const handleInterventionChange = (selectedInterventions) => {
    setScenario({ ...scenario, interventions: selectedInterventions });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="TestTube" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Scenario Analysis</h2>
              <p className="text-sm text-text-secondary">Create custom intervention scenarios for AI analysis</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center">
              <Icon name="FileText" size={16} className="mr-2 text-primary" />
              Scenario Details
            </h3>
            
            <Input
              label="Scenario Name"
              placeholder="e.g., Emergency Winter Action Plan"
              value={scenario?.name}
              onChange={(e) => setScenario({ ...scenario, name: e?.target?.value })}
              required
            />
            
            <Input
              label="Description"
              placeholder="Brief description of the scenario"
              value={scenario?.description}
              onChange={(e) => setScenario({ ...scenario, description: e?.target?.value })}
            />
          </div>

          {/* Interventions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center">
              <Icon name="Settings" size={16} className="mr-2 text-secondary" />
              Policy Interventions
            </h3>
            
            <Select
              label="Select Interventions"
              description="Choose multiple interventions to analyze their combined impact"
              options={interventionOptions}
              value={scenario?.interventions}
              onChange={handleInterventionChange}
              multiple
              searchable
              placeholder="Select interventions..."
            />
          </div>

          {/* Parameters */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center">
              <Icon name="Sliders" size={16} className="mr-2 text-accent" />
              Analysis Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Analysis Timeline (days)"
                type="number"
                placeholder="30"
                value={scenario?.timeline}
                onChange={(e) => setScenario({ ...scenario, timeline: e?.target?.value })}
                min="1"
                max="365"
              />
              
              <Input
                label="Target AQI Level"
                type="number"
                placeholder="100"
                value={scenario?.targetAQI}
                onChange={(e) => setScenario({ ...scenario, targetAQI: e?.target?.value })}
                min="0"
                max="500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Weather Conditions"
                options={weatherOptions}
                value={scenario?.weatherConditions}
                onChange={(value) => setScenario({ ...scenario, weatherConditions: value })}
              />
              
              <Select
                label="Seasonal Factors"
                options={seasonalOptions}
                value={scenario?.seasonalFactors}
                onChange={(value) => setScenario({ ...scenario, seasonalFactors: value })}
              />
            </div>
          </div>

          {/* Expected Outcomes Preview */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="Eye" size={16} className="mr-2 text-primary" />
              Analysis Preview
            </h4>
            <div className="text-sm text-text-secondary space-y-1">
              <p>• AI will analyze the combined impact of {scenario?.interventions?.length} selected interventions</p>
              <p>• Timeline: {scenario?.timeline} days analysis period</p>
              <p>• Target: Achieve AQI level of {scenario?.targetAQI} or better</p>
              <p>• Weather conditions: {weatherOptions?.find(w => w?.value === scenario?.weatherConditions)?.label}</p>
              <p>• Seasonal factors: {seasonalOptions?.find(s => s?.value === scenario?.seasonalFactors)?.label}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Analysis typically takes 30-60 seconds to complete
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleAnalyze}
              loading={isAnalyzing}
              disabled={!scenario?.name || scenario?.interventions?.length === 0}
            >
              <Icon name="Play" size={16} className="mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioAnalysisModal;