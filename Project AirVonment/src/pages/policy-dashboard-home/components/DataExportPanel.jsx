import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DataExportPanel = () => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV Format', description: 'Comma-separated values' },
    { value: 'xlsx', label: 'Excel Format', description: 'Microsoft Excel spreadsheet' },
    { value: 'pdf', label: 'PDF Report', description: 'Formatted document' },
    { value: 'json', label: 'JSON Data', description: 'Raw data format' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const dataTypeOptions = [
    { value: 'aqi', label: 'AQI Data', description: 'Air quality measurements' },
    { value: 'sources', label: 'Pollution Sources', description: 'Source contribution data' },
    { value: 'reports', label: 'Citizen Reports', description: 'User-submitted reports' },
    { value: 'interventions', label: 'Policy Interventions', description: 'Simulation results' },
    { value: 'all', label: 'Complete Dataset', description: 'All available data' }
  ];

  const handleExport = async () => {
    if (!selectedFormat || !selectedDateRange || !selectedDataType) {
      return;
    }

    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In real app, this would trigger actual download
      console.log('Export completed:', { selectedFormat, selectedDateRange, selectedDataType });
    }, 2000);
  };

  const quickExportOptions = [
    { label: 'Daily AQI Summary', format: 'pdf', type: 'aqi', range: 'today' },
    { label: 'Weekly Report', format: 'xlsx', type: 'all', range: 'week' },
    { label: 'Source Analysis', format: 'csv', type: 'sources', range: 'month' }
  ];

  const handleQuickExport = (option) => {
    setSelectedFormat(option?.format);
    setSelectedDateRange(option?.range);
    setSelectedDataType(option?.type);
    
    // Auto-trigger export after a brief delay
    setTimeout(() => {
      handleExport();
    }, 500);
  };

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Data Export</h3>
          <p className="text-sm text-text-secondary mt-1">Generate reports and export data</p>
        </div>
        <Icon name="Download" size={20} className="text-text-secondary" />
      </div>
      {/* Quick Export Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Export</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickExportOptions?.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickExport(option)}
              disabled={isExporting}
              className="justify-start"
              iconName="Download"
              iconPosition="left"
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Custom Export */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Custom Export</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Data Type"
            placeholder="Select data type"
            options={dataTypeOptions}
            value={selectedDataType}
            onChange={setSelectedDataType}
          />
          
          <Select
            label="Date Range"
            placeholder="Select date range"
            options={dateRangeOptions}
            value={selectedDateRange}
            onChange={setSelectedDateRange}
          />
          
          <Select
            label="Format"
            placeholder="Select format"
            options={formatOptions}
            value={selectedFormat}
            onChange={setSelectedFormat}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-text-secondary">
            {selectedFormat && selectedDateRange && selectedDataType ? (
              `Ready to export ${selectedDataType} data for ${selectedDateRange} as ${selectedFormat?.toUpperCase()}`
            ) : (
              'Select options to enable export'
            )}
          </div>
          
          <Button
            variant="default"
            onClick={handleExport}
            disabled={!selectedFormat || !selectedDateRange || !selectedDataType || isExporting}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataExportPanel;