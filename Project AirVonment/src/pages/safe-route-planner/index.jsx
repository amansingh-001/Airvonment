import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RouteCard from './components/RouteCard';
import LocationInput from './components/LocationInput';
import RouteFilters from './components/RouteFilters';
import InteractiveMap from './components/InteractiveMap';
import NavigationPanel from './components/NavigationPanel';

const SafeRoutePlanner = () => {
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeFilter, setActiveFilter] = useState('balanced');
  const [transportMode, setTransportMode] = useState('walking');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showNavigationPanel, setShowNavigationPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Mock route data
  const mockRoutes = [
    {
      id: 1,
      name: "Green Corridor Route",
      mode: "PersonStanding",
      distance: "3.2 km",
      duration: "38 min",
      avgAQI: 134,
      benefits: ["Parks nearby", "Less traffic", "Shaded path"],
      coordinates: [
        { lat: 28.6139, lng: 77.2090 },
        { lat: 28.6200, lng: 77.2150 },
        { lat: 28.6250, lng: 77.2200 }
      ]
    },
    {
      id: 2,
      name: "Metro Connect Route",
      mode: "PersonStanding",
      distance: "2.8 km",
      duration: "32 min",
      avgAQI: 156,
      benefits: ["Metro access", "Covered walkways"],
      coordinates: [
        { lat: 28.6139, lng: 77.2090 },
        { lat: 28.6180, lng: 77.2120 },
        { lat: 28.6220, lng: 77.2180 }
      ]
    },
    {
      id: 3,
      name: "Direct Main Road",
      mode: "PersonStanding",
      distance: "2.5 km",
      duration: "28 min",
      avgAQI: 189,
      benefits: ["Shortest distance", "Well-lit"],
      coordinates: [
        { lat: 28.6139, lng: 77.2090 },
        { lat: 28.6170, lng: 77.2140 },
        { lat: 28.6200, lng: 77.2190 }
      ]
    }
  ];

  // Mock recent and favorite locations
  const recentLocations = [
    { id: 1, name: "India Gate, New Delhi", aqi: 142 },
    { id: 2, name: "Karol Bagh Market", aqi: 189 },
    { id: 3, name: "Dwarka Metro Station", aqi: 165 }
  ];

  const favoriteLocations = [
    { id: 1, name: "Home - Connaught Place", aqi: 156 },
    { id: 2, name: "Office - Cyber City", aqi: 178 },
    { id: 3, name: "Gym - Rajouri Garden", aqi: 158 }
  ];

  const handleRouteSearch = () => {
    if (!sourceLocation || !destinationLocation) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSelectedRoute(mockRoutes?.[0]?.id);
      setIsLoading(false);
    }, 1500);
  };

  const handleRouteSelect = (routeId) => {
    setSelectedRoute(routeId);
  };

  const handleNavigateRoute = (route) => {
    setShowNavigationPanel(true);
  };

  const handleSwapLocations = () => {
    const temp = sourceLocation;
    setSourceLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const selectedRouteData = mockRoutes?.find(route => route?.id === selectedRoute);

  return (
    <>
      <Helmet>
        <title>Safe Route Planner - AirSense NCR</title>
        <meta name="description" content="Plan your routes with real-time air quality data to minimize pollution exposure while traveling in Delhi NCR." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="space-header">
          <div className="container mx-auto px-4 py-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                  <Icon name="Route" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    Safe Route Planner
                  </h1>
                  <p className="text-text-secondary">
                    Navigate with real-time air quality awareness
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Panel - Route Planning */}
              <div className="lg:col-span-4 space-y-6">
                {/* Location Inputs */}
                <div className="card-base p-4">
                  <h2 className="font-semibold text-text-primary mb-4">Plan Your Route</h2>
                  
                  <div className="space-y-4">
                    <LocationInput
                      label="From"
                      value={sourceLocation}
                      onChange={setSourceLocation}
                      onLocationSelect={setSourceLocation}
                      placeholder="Enter starting location"
                      showCurrentLocation={true}
                      recentLocations={recentLocations}
                      favoriteLocations={favoriteLocations}
                    />

                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSwapLocations}
                        className="rounded-full"
                        title="Swap locations"
                      >
                        <Icon name="ArrowUpDown" size={16} />
                      </Button>
                    </div>

                    <LocationInput
                      label="To"
                      value={destinationLocation}
                      onChange={setDestinationLocation}
                      onLocationSelect={setDestinationLocation}
                      placeholder="Enter destination"
                      recentLocations={recentLocations}
                      favoriteLocations={favoriteLocations}
                    />

                    <Button
                      variant="default"
                      className="w-full"
                      iconName="Search"
                      loading={isLoading}
                      onClick={handleRouteSearch}
                      disabled={!sourceLocation || !destinationLocation}
                    >
                      Find Safe Routes
                    </Button>
                  </div>
                </div>

                {/* Filters - Desktop */}
                <div className="hidden lg:block card-base p-4">
                  <RouteFilters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    transportMode={transportMode}
                    onTransportModeChange={setTransportMode}
                    showAdvanced={showAdvancedFilters}
                    onToggleAdvanced={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  />
                </div>

                {/* Route Results */}
                {mockRoutes?.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-text-primary">
                        Route Options ({mockRoutes?.length})
                      </h3>
                      
                      {/* Mobile Filters Toggle */}
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Filter"
                        className="lg:hidden"
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                      >
                        Filters
                      </Button>
                    </div>

                    {/* Mobile Filters */}
                    {isMobileFiltersOpen && (
                      <div className="lg:hidden card-base p-4">
                        <RouteFilters
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                          transportMode={transportMode}
                          onTransportModeChange={setTransportMode}
                          showAdvanced={showAdvancedFilters}
                          onToggleAdvanced={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      {mockRoutes?.map((route) => (
                        <RouteCard
                          key={route?.id}
                          route={route}
                          isSelected={selectedRoute === route?.id}
                          onSelect={handleRouteSelect}
                          onNavigate={handleNavigateRoute}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="card-base p-4">
                  <h3 className="font-semibold text-text-primary mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" iconName="Home">
                      Go Home
                    </Button>
                    <Button variant="outline" size="sm" iconName="Building2">
                      Go to Work
                    </Button>
                    <Button variant="outline" size="sm" iconName="Heart">
                      Favorites
                    </Button>
                    <Button variant="outline" size="sm" iconName="History">
                      Recent
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Panel - Map */}
              <div className="lg:col-span-8">
                <div className="h-96 lg:h-[calc(100vh-12rem)]">
                  <InteractiveMap
                    routes={mockRoutes}
                    selectedRoute={selectedRoute}
                    onRouteSelect={handleRouteSelect}
                    sourceLocation={sourceLocation}
                    destinationLocation={destinationLocation}
                    showAQIOverlay={true}
                  />
                </div>
              </div>
            </div>

            {/* Navigation Panel Modal */}
            {showNavigationPanel && selectedRouteData && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
                  <NavigationPanel
                    route={selectedRouteData}
                    onClose={() => setShowNavigationPanel(false)}
                    onStartNavigation={(route) => {
                      console.log('Starting navigation for:', route);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Air Quality Alert */}
            <div className="mt-6 card-base p-4 border-l-4 border-l-orange-500 bg-orange-50/50">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-800 mb-1">
                    Air Quality Advisory
                  </h4>
                  <p className="text-sm text-orange-700">
                    Current AQI levels are moderate to unhealthy. Consider wearing a mask during outdoor activities and choose routes through parks or less congested areas when possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SafeRoutePlanner;