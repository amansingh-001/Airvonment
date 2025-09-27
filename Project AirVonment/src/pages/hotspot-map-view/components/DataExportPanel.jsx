import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataExportPanel = ({ hotspots, onExport, isOpen, onClose }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFields, setExportFields] = useState({
    coordinates: true,
    confidence: true,
    timestamp: true,
    area: true,
    type: true,
    intensity: true
  });
  const [dateRange, setDateRange] = useState('current');

  const formatOptions = [
    { value: 'csv', label: 'CSV Format' },
    { value: 'json', label: 'JSON Format' },
    { value: 'kml', label: 'KML (Google Earth)' },
    { value: 'geojson', label: 'GeoJSON' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const dateRangeOptions = [
    { value: 'current', label: 'Current View' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const fieldOptions = [
    { key: 'coordinates', label: 'Coordinates (Lat/Lng)' },
    { key: 'confidence', label: 'Confidence Level' },
    { key: 'timestamp', label: 'Detection Time' },
    { key: 'area', label: 'Affected Area' },
    { key: 'type', label: 'Fire Type' },
    { key: 'intensity', label: 'Fire Intensity' }
  ];

  const handleFieldToggle = (field, checked) => {
    setExportFields(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleExport = () => {
    const exportData = {
      format: exportFormat,
      fields: exportFields,
      dateRange: dateRange,
      hotspots: hotspots,
      timestamp: new Date()?.toISOString()
    };
    
    onExport(exportData);
  };

  const getSelectedFieldsCount = () => {
    return Object.values(exportFields)?.filter(Boolean)?.length;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-4 right-20 z-20 bg-card border border-border rounded-lg shadow-lg w-80 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Download" size={18} className="mr-2" />
          Export Data
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Export Configuration */}
      <div className="p-4 space-y-4">
        {/* Format Selection */}
        <div>
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>

        {/* Field Selection */}
        <div>
          <label className="text-sm font-medium text-text-primary mb-3 block">
            Include Fields ({getSelectedFieldsCount()}/{fieldOptions?.length})
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
            {fieldOptions?.map((field) => (
              <Checkbox
                key={field?.key}
                label={field?.label}
                checked={exportFields?.[field?.key]}
                onChange={(e) => handleFieldToggle(field?.key, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-muted rounded-lg p-3">
          <h4 className="text-sm font-medium text-text-primary mb-2">Export Summary</h4>
          <div className="space-y-1 text-sm text-text-secondary">
            <div className="flex justify-between">
              <span>Total Hotspots:</span>
              <span className="font-data">{hotspots?.length}</span>
            </div>
            <div className="flex justify-between">
              <span>High Confidence:</span>
              <span className="font-data">
                {hotspots?.filter(h => h?.confidence >= 80)?.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Active Fires:</span>
              <span className="font-data">
                {hotspots?.filter(h => h?.status === 'active')?.length}
              </span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="space-y-2 pt-2 border-t border-border">
          <Button
            variant="default"
            onClick={handleExport}
            disabled={getSelectedFieldsCount() === 0}
            className="w-full"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export {hotspots?.length} Hotspots
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Generate quick report
                const reportData = {
                  format: 'pdf',
                  type: 'summary',
                  hotspots: hotspots
                };
                onExport(reportData);
              }}
            >
              <Icon name="FileText" size={14} className="mr-1" />
              Quick Report
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Share via email/link
                const shareData = {
                  format: 'link',
                  hotspots: hotspots,
                  timestamp: new Date()?.toISOString()
                };
                onExport(shareData);
              }}
            >
              <Icon name="Share" size={14} className="mr-1" />
              Share Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportPanel;