import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, recommendations, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeDetails: true,
    includeCharts: true,
    includeImplementation: true,
    includeResources: true,
    selectedRecommendations: [],
    reportType: 'comprehensive'
  });
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Word Document' },
    { value: 'xlsx', label: 'Excel Spreadsheet' },
    { value: 'json', label: 'JSON Data' }
  ];

  const reportTypeOptions = [
    { value: 'comprehensive', label: 'Comprehensive Report' },
    { value: 'executive', label: 'Executive Summary' },
    { value: 'implementation', label: 'Implementation Guide' },
    { value: 'data_only', label: 'Data Export Only' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    await onExport(exportConfig);
    setTimeout(() => {
      setIsExporting(false);
      onClose();
    }, 2000);
  };

  const handleRecommendationToggle = (recommendationId) => {
    const selected = exportConfig?.selectedRecommendations;
    const newSelected = selected?.includes(recommendationId)
      ? selected?.filter(id => id !== recommendationId)
      : [...selected, recommendationId];
    
    setExportConfig({ ...exportConfig, selectedRecommendations: newSelected });
  };

  const selectAllRecommendations = () => {
    const allIds = recommendations?.map(r => r?.id);
    setExportConfig({ ...exportConfig, selectedRecommendations: allIds });
  };

  const clearAllRecommendations = () => {
    setExportConfig({ ...exportConfig, selectedRecommendations: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Export Recommendations</h2>
              <p className="text-sm text-text-secondary">Generate policy briefs and implementation guides</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center">
              <Icon name="FileText" size={16} className="mr-2 text-primary" />
              Export Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Export Format"
                options={formatOptions}
                value={exportConfig?.format}
                onChange={(value) => setExportConfig({ ...exportConfig, format: value })}
              />
              
              <Select
                label="Report Type"
                options={reportTypeOptions}
                value={exportConfig?.reportType}
                onChange={(value) => setExportConfig({ ...exportConfig, reportType: value })}
              />
            </div>
          </div>

          {/* Content Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center">
              <Icon name="Settings" size={16} className="mr-2 text-secondary" />
              Content Options
            </h3>
            
            <div className="space-y-3">
              <Checkbox
                label="Include detailed analysis and rationale"
                checked={exportConfig?.includeDetails}
                onChange={(e) => setExportConfig({ ...exportConfig, includeDetails: e?.target?.checked })}
              />
              
              <Checkbox
                label="Include charts and visualizations"
                checked={exportConfig?.includeCharts}
                onChange={(e) => setExportConfig({ ...exportConfig, includeCharts: e?.target?.checked })}
              />
              
              <Checkbox
                label="Include implementation guidelines"
                checked={exportConfig?.includeImplementation}
                onChange={(e) => setExportConfig({ ...exportConfig, includeImplementation: e?.target?.checked })}
              />
              
              <Checkbox
                label="Include resource requirements"
                checked={exportConfig?.includeResources}
                onChange={(e) => setExportConfig({ ...exportConfig, includeResources: e?.target?.checked })}
              />
            </div>
          </div>

          {/* Recommendation Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary flex items-center">
                <Icon name="CheckSquare" size={16} className="mr-2 text-accent" />
                Select Recommendations
              </h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={selectAllRecommendations}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAllRecommendations}>
                  Clear All
                </Button>
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
              {recommendations?.map((recommendation) => (
                <div key={recommendation?.id} className="flex items-start space-x-3 p-2 hover:bg-muted rounded-md">
                  <Checkbox
                    checked={exportConfig?.selectedRecommendations?.includes(recommendation?.id)}
                    onChange={() => handleRecommendationToggle(recommendation?.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-primary truncate">
                        {recommendation?.title}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        recommendation?.priority === 'critical' ? 'bg-destructive text-destructive-foreground' :
                        recommendation?.priority === 'high' ? 'bg-warning text-warning-foreground' :
                        recommendation?.priority === 'medium' ? 'bg-secondary text-secondary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {recommendation?.priority}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 truncate">
                      {recommendation?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-text-secondary">
              {exportConfig?.selectedRecommendations?.length} of {recommendations?.length} recommendations selected
            </div>
          </div>

          {/* Export Preview */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
              <Icon name="Eye" size={16} className="mr-2 text-primary" />
              Export Preview
            </h4>
            <div className="text-sm text-text-secondary space-y-1">
              <p>• Format: {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</p>
              <p>• Report Type: {reportTypeOptions?.find(r => r?.value === exportConfig?.reportType)?.label}</p>
              <p>• Recommendations: {exportConfig?.selectedRecommendations?.length} selected</p>
              <p>• Estimated file size: {exportConfig?.includeCharts ? '2-5 MB' : '500KB - 2MB'}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Export will be downloaded automatically
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleExport}
              loading={isExporting}
              disabled={exportConfig?.selectedRecommendations?.length === 0}
            >
              <Icon name="Download" size={16} className="mr-2" />
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;