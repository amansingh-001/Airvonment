import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFilterChange, onReset, totalRecommendations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'traffic', label: 'Traffic Management' },
    { value: 'industrial', label: 'Industrial Control' },
    { value: 'construction', label: 'Construction Regulation' },
    { value: 'agricultural', label: 'Agricultural Burning' },
    { value: 'emergency', label: 'Emergency Measures' }
  ];

  const timelineOptions = [
    { value: 'all', label: 'All Timelines' },
    { value: 'immediate', label: 'Immediate (0-7 days)' },
    { value: 'short', label: 'Short-term (1-4 weeks)' },
    { value: 'medium', label: 'Medium-term (1-6 months)' },
    { value: 'long', label: 'Long-term (6+ months)' }
  ];

  const confidenceOptions = [
    { value: 'all', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (80%+)' },
    { value: 'medium', label: 'Medium (60-79%)' },
    { value: 'low', label: 'Low (<60%)' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all')?.length;
  };

  return (
    <div className="card-base p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Filter Recommendations</h3>
            <p className="text-xs text-text-secondary">
              {totalRecommendations} recommendations available
              {getActiveFilterCount() > 0 && ` • ${getActiveFilterCount()} filters active`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <Icon name="X" size={16} className="mr-1" />
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Priority Filter */}
          <Select
            label="Priority Level"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            className="w-full"
          />

          {/* Category Filter */}
          <Select
            label="Policy Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            className="w-full"
          />

          {/* Timeline Filter */}
          <Select
            label="Implementation Timeline"
            options={timelineOptions}
            value={filters?.timeline}
            onChange={(value) => handleFilterChange('timeline', value)}
            className="w-full"
          />

          {/* Confidence Filter */}
          <Select
            label="AI Confidence"
            options={confidenceOptions}
            value={filters?.confidence}
            onChange={(value) => handleFilterChange('confidence', value)}
            className="w-full"
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-xs text-text-secondary font-medium mr-2 py-2">Quick Filters:</span>
          
          <Button
            variant={filters?.priority === 'critical' ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('priority', filters?.priority === 'critical' ? 'all' : 'critical')}
          >
            <Icon name="AlertTriangle" size={14} className="mr-1" />
            Critical Only
          </Button>
          
          <Button
            variant={filters?.timeline === 'immediate' ? 'warning' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('timeline', filters?.timeline === 'immediate' ? 'all' : 'immediate')}
          >
            <Icon name="Clock" size={14} className="mr-1" />
            Immediate Action
          </Button>
          
          <Button
            variant={filters?.confidence === 'high' ? 'success' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('confidence', filters?.confidence === 'high' ? 'all' : 'high')}
          >
            <Icon name="TrendingUp" size={14} className="mr-1" />
            High Confidence
          </Button>
          
          <Button
            variant={filters?.category === 'emergency' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('category', filters?.category === 'emergency' ? 'all' : 'emergency')}
          >
            <Icon name="Siren" size={14} className="mr-1" />
            Emergency Measures
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;