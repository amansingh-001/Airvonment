import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ 
  routes, 
  selectedRoute, 
  onRouteSelect,
  sourceLocation,
  destinationLocation,
  showAQIOverlay = true 
}) => {
  const [mapView, setMapView] = useState('standard');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock AQI monitoring stations
  const aqiStations = [
    { id: 1, name: "Connaught Place", lat: 28.6139, lng: 77.2090, aqi: 156, status: "moderate" },
    { id: 2, name: "India Gate", lat: 28.6129, lng: 77.2295, aqi: 142, status: "moderate" },
    { id: 3, name: "Rajouri Garden", lat: 28.6467, lng: 77.1203, aqi: 189, status: "unhealthy" },
    { id: 4, name: "Dwarka", lat: 28.5921, lng: 77.0460, aqi: 165, status: "unhealthy" },
    { id: 5, name: "Noida Sector 62", lat: 28.6271, lng: 77.3716, aqi: 134, status: "moderate" },
    { id: 6, name: "Gurgaon Cyber City", lat: 28.4595, lng: 77.0266, aqi: 178, status: "unhealthy" }
  ];

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#10B981'; // green
    if (aqi <= 100) return '#F59E0B'; // yellow
    if (aqi <= 150) return '#F97316'; // orange
    if (aqi <= 200) return '#EF4444'; // red
    return '#8B5CF6'; // purple
  };

  const getRouteColor = (routeId) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    return colors?.[routeId % colors?.length];
  };

  const mapViewOptions = [
    { id: 'standard', name: 'Standard', icon: 'Map' },
    { id: 'satellite', name: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', name: 'Terrain', icon: 'Mountain' }
  ];

  return (
    <div className={`relative bg-card rounded-lg border border-border overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50' : 'h-96 lg:h-full'
    }`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {/* View Toggle */}
        <div className="flex bg-card/90 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
          {mapViewOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => setMapView(option?.id)}
              className={`px-3 py-2 text-xs font-medium transition-colors duration-200 ${
                mapView === option?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
              title={option?.name}
            >
              <Icon name={option?.icon} size={14} />
            </button>
          ))}
        </div>

        {/* AQI Overlay Toggle */}
        <Button
          variant={showAQIOverlay ? "default" : "outline"}
          size="sm"
          iconName="Wind"
          className="bg-card/90 backdrop-blur-sm"
          onClick={() => {}} // This would toggle AQI overlay in real implementation
        >
          AQI
        </Button>
      </div>
      {/* Map Actions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          title="Center on route"
        >
          <Icon name="Crosshair" size={16} />
        </Button>
      </div>
      {/* Mock Google Maps Iframe */}
      <div className="relative w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Safe Route Planner Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=28.6139,77.2090&z=12&output=embed"
          className="border-0"
        />
        
        {/* Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* AQI Stations Overlay */}
          {showAQIOverlay && aqiStations?.map((station) => (
            <div
              key={station?.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (station?.id * 15)}%`,
                top: `${30 + (station?.id * 10)}%`
              }}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: getAQIColor(station?.aqi) }}
                title={`${station?.name}: AQI ${station?.aqi}`}
              />
            </div>
          ))}

          {/* Route Lines Visualization */}
          {routes?.map((route, index) => (
            <div
              key={route?.id}
              className={`absolute pointer-events-auto cursor-pointer transition-opacity duration-200 ${
                selectedRoute === route?.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
              style={{
                left: `${10 + index * 5}%`,
                top: `${40 + index * 8}%`,
                width: `${60 - index * 5}%`,
                height: '4px',
                backgroundColor: getRouteColor(route?.id),
                borderRadius: '2px',
                transform: `rotate(${15 + index * 10}deg)`
              }}
              onClick={() => onRouteSelect(route?.id)}
            />
          ))}
        </div>
      </div>
      {/* Map Legend */}
      {showAQIOverlay && (
        <div className="absolute bottom-4 left-4 z-10 bg-card/90 backdrop-blur-sm rounded-lg border border-border p-3">
          <h4 className="text-xs font-semibold text-text-primary mb-2">AQI Legend</h4>
          <div className="space-y-1">
            {[
              { range: '0-50', label: 'Good', color: '#10B981' },
              { range: '51-100', label: 'Moderate', color: '#F59E0B' },
              { range: '101-150', label: 'Unhealthy for Sensitive', color: '#F97316' },
              { range: '151-200', label: 'Unhealthy', color: '#EF4444' },
              { range: '201+', label: 'Very Unhealthy', color: '#8B5CF6' }
            ]?.map((item) => (
              <div key={item?.range} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-text-secondary">
                  {item?.range} - {item?.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Route Summary Overlay */}
      {selectedRoute && (
        <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-sm rounded-lg border border-border p-3 max-w-xs">
          {(() => {
            const route = routes?.find(r => r?.id === selectedRoute);
            return route ? (
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-2">
                  {route?.name}
                </h4>
                <div className="space-y-1 text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="text-text-primary">{route?.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-text-primary">{route?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg AQI:</span>
                    <span 
                      className="font-medium"
                      style={{ color: getAQIColor(route?.avgAQI) }}
                    >
                      {route?.avgAQI}
                    </span>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;