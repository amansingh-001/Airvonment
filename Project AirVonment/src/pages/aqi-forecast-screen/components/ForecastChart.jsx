import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ForecastChart = ({ data, selectedRange, onExport }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // AQI color zones
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#4CAF50'; // Good - Green
    if (aqi <= 100) return '#FF9800'; // Moderate - Orange  
    if (aqi <= 150) return '#FF6B35'; // Unhealthy for Sensitive - Orange-Red
    if (aqi <= 200) return '#D32F2F'; // Unhealthy - Red
    if (aqi <= 300) return '#9C27B0'; // Very Unhealthy - Purple
    return '#8B0000'; // Hazardous - Maroon
  };

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <div className="space-y-2">
            <div className="font-medium text-text-primary">{data?.time}</div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getAQIColor(data?.aqi) }}
              />
              <span className="text-lg font-bold text-text-primary">AQI {data?.aqi}</span>
            </div>
            <div className="text-sm text-text-secondary">{getAQICategory(data?.aqi)}</div>
            <div className="text-xs text-text-secondary">
              Temp: {data?.temperature}°C | Humidity: {data?.humidity}%
            </div>
            {data?.recommendation && (
              <div className="text-xs text-text-primary bg-muted p-2 rounded">
                💡 {data?.recommendation}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="forecast-chart bg-card rounded-lg border border-border p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            AQI Forecast - {selectedRange?.toUpperCase()}
          </h3>
          <p className="text-sm text-text-secondary">
            Predicted air quality index with health impact zones
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              title="Zoom Out"
            >
              <Icon name="ZoomOut" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetZoom}
              disabled={zoomLevel === 1}
              title="Reset Zoom"
            >
              <Icon name="RotateCcw" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              title="Zoom In"
            >
              <Icon name="ZoomIn" size={16} />
            </Button>
          </div>
          
          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* AQI Legend */}
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-orange-600" />
            <span>Unhealthy for Sensitive (101-150)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-700" />
            <span>Unhealthy (151-200)</span>
          </div>
        </div>
      </div>
      {/* Chart Container */}
      <div className="h-80 sm:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ value: 'AQI', angle: -90, position: 'insideLeft' }}
            />
            
            {/* Reference lines for AQI categories */}
            <ReferenceLine y={50} stroke="#4CAF50" strokeDasharray="2 2" />
            <ReferenceLine y={100} stroke="#FF9800" strokeDasharray="2 2" />
            <ReferenceLine y={150} stroke="#FF6B35" strokeDasharray="2 2" />
            <ReferenceLine y={200} stroke="#D32F2F" strokeDasharray="2 2" />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>Last updated: {new Date()?.toLocaleString('en-IN')}</span>
            <span>•</span>
            <span>Data source: Environmental Monitoring Network</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={14} />
            <span>Hover over chart points for detailed information</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;