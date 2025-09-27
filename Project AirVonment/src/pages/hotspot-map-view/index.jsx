import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MapControls from './components/MapControls';
import HotspotMarker from './components/HotspotMarker';
import HotspotPopup from './components/HotspotPopup';
import SearchPanel from './components/SearchPanel';
import TimeSeriesControls from './components/TimeSeriesControls';
import DataExportPanel from './components/DataExportPanel';
import MeasurementTools from './components/MeasurementTools';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HotspotMapView = () => {
  const [activeLayer, setActiveLayer] = useState('satellite');
  const [filters, setFilters] = useState({
    'high-confidence': true,
    'medium-confidence': true,
    'today': true,
    'week': false,
    'stubble': true,
    'industrial': false
  });
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [isTimeSeriesPlaying, setIsTimeSeriesPlaying] = useState(false);
  const [activeMeasurementTool, setActiveMeasurementTool] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });
  const [zoomLevel, setZoomLevel] = useState(10);

  // Mock hotspot data
  const hotspots = [
    {
      id: 1,
      coordinates: { lat: 28.7041, lng: 77.1025 },
      location: "Rohini, Delhi",
      confidence: 85,
      detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      affectedArea: 2.5,
      type: "Stubble Burning",
      intensity: 45.2,
      status: "active"
    },
    {
      id: 2,
      coordinates: { lat: 28.4595, lng: 77.0266 },
      location: "Gurgaon Sector 14",
      confidence: 72,
      detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      affectedArea: 1.8,
      type: "Industrial Fire",
      intensity: 32.1,
      status: "contained"
    },
    {
      id: 3,
      coordinates: { lat: 28.5355, lng: 77.3910 },
      location: "Noida Sector 62",
      confidence: 91,
      detectedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      affectedArea: 3.2,
      type: "Waste Burning",
      intensity: 52.8,
      status: "active"
    },
    {
      id: 4,
      coordinates: { lat: 28.3670, lng: 77.3617 },
      location: "Faridabad Industrial Area",
      confidence: 68,
      detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      affectedArea: 1.2,
      type: "Industrial Fire",
      intensity: 28.5,
      status: "extinguished"
    },
    {
      id: 5,
      coordinates: { lat: 28.6692, lng: 77.4538 },
      location: "Ghaziabad Loni",
      confidence: 79,
      detectedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      affectedArea: 2.1,
      type: "Stubble Burning",
      intensity: 38.9,
      status: "active"
    }
  ];

  const filteredHotspots = hotspots?.filter(hotspot => {
    if (filters?.['high-confidence'] && hotspot?.confidence >= 80) return true;
    if (filters?.['medium-confidence'] && hotspot?.confidence >= 60 && hotspot?.confidence < 80) return true;
    if (filters?.['today'] && (Date.now() - hotspot?.detectedAt?.getTime()) < 24 * 60 * 60 * 1000) return true;
    if (filters?.['stubble'] && hotspot?.type === 'Stubble Burning') return true;
    if (filters?.['industrial'] && hotspot?.type === 'Industrial Fire') return true;
    return false;
  });

  const handleLayerToggle = (layerId) => {
    setActiveLayer(layerId);
  };

  const handleFilterChange = (filterId, checked) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: checked
    }));
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 3));
  };

  const handleResetView = () => {
    setMapCenter({ lat: 28.6139, lng: 77.2090 });
    setZoomLevel(10);
    setSelectedHotspot(null);
  };

  const handleSearch = (query) => {
    // Mock search implementation
    console.log('Searching for:', query);
    // In real app, this would geocode the query and update map center
  };

  const handleLocationSelect = (location) => {
    if (location?.type === 'current') {
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation?.getCurrentPosition((position) => {
          setMapCenter({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
          setZoomLevel(14);
        });
      }
    } else if (location?.type === 'center') {
      setMapCenter({ lat: 28.6139, lng: 77.2090 });
      setZoomLevel(10);
    } else if (location?.lat && location?.lng) {
      setMapCenter(location);
      setZoomLevel(14);
    }
  };

  const handleTimeChange = (time) => {
    console.log('Time changed to:', time);
    // In real app, this would filter hotspots by time
  };

  const handlePlaybackControl = (action) => {
    switch (action) {
      case 'play':
        setIsTimeSeriesPlaying(true);
        break;
      case 'pause':
        setIsTimeSeriesPlaying(false);
        break;
      case 'previous':
        // Go to previous time step
        break;
      case 'next':
        // Go to next time step
        break;
      default:
        break;
    }
  };

  const handleExport = (exportData) => {
    console.log('Exporting data:', exportData);
    // In real app, this would generate and download the file
    setIsExportPanelOpen(false);
  };

  const handleToolSelect = (toolId) => {
    setActiveMeasurementTool(activeMeasurementTool === toolId ? null : toolId);
  };

  const handleClearMeasurements = () => {
    setMeasurements([]);
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    setMapCenter(hotspot?.coordinates);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 h-screen relative overflow-hidden">
        {/* Map Container */}
        <div className="w-full h-full relative bg-muted">
          {/* Mock Map Background */}
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative">
            {/* Map Iframe */}
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="NCR Hotspot Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
              className="absolute inset-0"
            />

            {/* Hotspot Markers Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {filteredHotspots?.map((hotspot) => (
                <div
                  key={hotspot?.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${50 + (hotspot?.coordinates?.lng - mapCenter?.lng) * 100}%`,
                    top: `${50 - (hotspot?.coordinates?.lat - mapCenter?.lat) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <HotspotMarker
                    hotspot={hotspot}
                    onClick={handleHotspotClick}
                    isSelected={selectedHotspot?.id === hotspot?.id}
                  />
                </div>
              ))}
            </div>

            {/* Selected Hotspot Popup */}
            {selectedHotspot && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
                <HotspotPopup
                  hotspot={selectedHotspot}
                  onClose={() => setSelectedHotspot(null)}
                  onExport={(hotspot) => handleExport({ hotspots: [hotspot], format: 'csv' })}
                />
              </div>
            )}
          </div>

          {/* Map Controls */}
          <MapControls
            onLayerToggle={handleLayerToggle}
            onFilterChange={handleFilterChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetView}
            activeLayer={activeLayer}
            filters={filters}
          />

          {/* Search Panel */}
          <SearchPanel
            onSearch={handleSearch}
            onLocationSelect={handleLocationSelect}
            isCollapsed={isSearchCollapsed}
            onToggle={() => setIsSearchCollapsed(!isSearchCollapsed)}
          />

          {/* Time Series Controls */}
          <TimeSeriesControls
            onTimeChange={handleTimeChange}
            onPlaybackControl={handlePlaybackControl}
            isPlaying={isTimeSeriesPlaying}
          />

          {/* Measurement Tools */}
          <MeasurementTools
            onToolSelect={handleToolSelect}
            activeTool={activeMeasurementTool}
            measurements={measurements}
            onClearMeasurements={handleClearMeasurements}
          />

          {/* Export Panel */}
          <DataExportPanel
            hotspots={filteredHotspots}
            onExport={handleExport}
            isOpen={isExportPanelOpen}
            onClose={() => setIsExportPanelOpen(false)}
          />

          {/* Quick Action Buttons */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExportPanelOpen(true)}
              className="bg-card shadow-lg"
            >
              <Icon name="Download" size={14} className="mr-2" />
              Export Data
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-card shadow-lg"
            >
              <Icon name="Share" size={14} className="mr-2" />
              Share Map
            </Button>
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-4 left-4 z-10 bg-card border border-border rounded-lg shadow-lg px-4 py-2">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-text-secondary">Live Data</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Flame" size={14} className="text-destructive" />
                <span className="text-text-primary font-medium">
                  {filteredHotspots?.length} Active Hotspots
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-text-secondary" />
                <span className="text-text-secondary">
                  Updated {new Date()?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Asia/Kolkata'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-10 bg-card border border-border rounded-lg shadow-lg p-3">
            <h4 className="text-sm font-semibold text-text-primary mb-2">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full" />
                <span className="text-text-secondary">High Confidence (&gt;80%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-text-secondary">Medium Confidence (60-80%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-text-secondary">Low Confidence (&lt;60%)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotspotMapView;