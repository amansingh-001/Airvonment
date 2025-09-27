import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AQIIndicatorCard from './components/AQIIndicatorCard';
import QuickAccessPanel from './components/QuickAccessPanel';
import WeatherInfoCard from './components/WeatherInfoCard';
import HealthRecommendations from './components/HealthRecommendations';
import LocationStatus from './components/LocationStatus';

const CitizenHomeDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock AQI Data
  const [aqiData] = useState({
    current: 156,
    lastUpdated: "26/09/2025, 07:35 AM",
    pollutants: [
      { name: "PM2.5", value: 89, unit: "μg/m³" },
      { name: "PM10", value: 142, unit: "μg/m³" },
      { name: "NO2", value: 45, unit: "ppb" },
      { name: "O3", value: 67, unit: "ppb" }
    ]
  });

  // Mock Location Data
  const [locationData] = useState({
    city: "New Delhi",
    area: "Connaught Place",
    state: "Delhi",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    accuracyRadius: 25
  });

  // Mock Weather Data
  const [weatherData] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    windDirection: 225,
    visibility: 3.2,
    pressure: 1013,
    uvIndex: 6
  });

  // Mock User Profile
  const [userProfile] = useState({
    hasAsthma: false,
    isPregnant: false,
    age: 32,
    exercisesOutdoors: true
  });

  const [locationAccuracy] = useState('medium');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate geolocation detection on component mount
  useEffect(() => {
    const detectLocation = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    detectLocation();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsLoading(false);
  };

  const handleLocationRefresh = async () => {
    setIsRefreshing(true);
    // Simulate location refresh
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Home Dashboard - AirSense NCR</title>
        <meta name="description" content="Real-time air quality monitoring for Delhi NCR. Check current AQI, weather conditions, and get personalized health recommendations." />
      </Helmet>
      <Header />
      <main className="space-header px-4 lg:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
              Air Quality Dashboard
            </h1>
            <p className="text-text-secondary">
              Real-time environmental monitoring for your location
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main AQI Display */}
            <div className="lg:col-span-2 space-y-6">
              <AQIIndicatorCard
                aqiData={aqiData}
                location={`${locationData?.area}, ${locationData?.city}`}
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
              
              <QuickAccessPanel aqiLevel={aqiData?.current} />
              
              <HealthRecommendations 
                aqiLevel={aqiData?.current}
                userProfile={userProfile}
              />
            </div>

            {/* Right Column - Secondary Information */}
            <div className="space-y-6">
              <WeatherInfoCard
                weatherData={weatherData}
                locationAccuracy={locationAccuracy}
              />
              
              <LocationStatus
                location={locationData}
                accuracy={locationAccuracy}
                lastUpdated={lastRefresh}
                onLocationRefresh={handleLocationRefresh}
                isRefreshing={isRefreshing}
              />

              {/* Additional Info Cards */}
              <div className="card-base p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-text-primary">
                    System Status
                  </span>
                </div>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Data Connection:</span>
                    <span className="text-success font-medium">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span className="text-text-primary">2 min ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Update:</span>
                    <span className="text-text-primary">In 8 min</span>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="card-base p-4 bg-primary/5 border-primary/20">
                <h4 className="font-semibold text-primary mb-2 text-sm">
                  💡 Pro Tip
                </h4>
                <p className="text-xs text-text-secondary">
                  Enable location services and notifications to receive real-time air quality alerts for your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenHomeDashboard;
