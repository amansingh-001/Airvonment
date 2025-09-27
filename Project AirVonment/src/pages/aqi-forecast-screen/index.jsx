import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TimeRangeSelector from './components/TimeRangeSelector';
import ForecastChart from './components/ForecastChart';
import HourlyBreakdown from './components/HourlyBreakdown';
import ForecastSummary from './components/ForecastSummary';

import Button from '../../components/ui/Button';

const AQIForecastScreen = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock forecast data
  const generateForecastData = (range) => {
    const hours = range === '24h' ? 24 : range === '48h' ? 48 : 72;
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < hours; i++) {
      const time = new Date(now.getTime() + i * 60 * 60 * 1000);
      const baseAQI = 80 + Math.sin(i * 0.3) * 40 + Math.random() * 30;
      const aqi = Math.max(20, Math.min(300, Math.round(baseAQI)));
      
      data?.push({
        time: time?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        date: time?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        aqi: aqi,
        temperature: Math.round(25 + Math.sin(i * 0.2) * 8 + Math.random() * 5),
        humidity: Math.round(60 + Math.sin(i * 0.15) * 20 + Math.random() * 10),
        windSpeed: Math.round(5 + Math.random() * 10),
        visibility: Math.round(8 + Math.random() * 4),
        pollutants: aqi > 100 ? ['PM2.5', 'PM10', 'NO2'] : aqi > 50 ? ['PM2.5', 'PM10'] : ['PM2.5'],
        recommendation: aqi <= 50 
          ? "Perfect for outdoor activities" 
          : aqi <= 100 
          ? "Moderate outdoor activities acceptable" 
          : aqi <= 150 
          ? "Limit prolonged outdoor exposure"
          : "Avoid outdoor activities"
      });
    }
    
    return data;
  };

  const [forecastData, setForecastData] = useState(() => generateForecastData('24h'));

  // Handle range change with loading simulation
  const handleRangeChange = async (newRange) => {
    setIsLoading(true);
    setSelectedRange(newRange);
    
    // Simulate API call delay
    setTimeout(() => {
      setForecastData(generateForecastData(newRange));
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Handle data refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setForecastData(generateForecastData(selectedRange));
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800);
  };

  // Handle export functionality
  const handleExport = () => {
    const csvContent = [
      ['Time', 'Date', 'AQI', 'Temperature', 'Humidity', 'Wind Speed', 'Visibility'],
      ...forecastData?.map(item => [
        item?.time,
        item?.date,
        item?.aqi,
        item?.temperature,
        item?.humidity,
        item?.windSpeed,
        item?.visibility
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aqi-forecast-${selectedRange}-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  // Navigation handlers
  const handleNavigateToRoutes = () => {
    navigate('/safe-route-planner');
  };

  const handleSetAlert = () => {
    // In a real app, this would open an alert configuration modal
    alert('Alert feature would open here to set personalized AQI thresholds and notifications.');
  };

  const handleNavigateHome = () => {
    navigate('/citizen-home-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-header px-4 lg:px-6 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNavigateHome}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">AQI Forecast</h1>
              <p className="text-text-secondary">
                Plan your outdoor activities with detailed air quality predictions for Delhi NCR
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Last Updated */}
              <div className="text-sm text-text-secondary">
                Last updated: {lastUpdated?.toLocaleTimeString('en-IN')}
              </div>
              
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                iconName="RefreshCw"
                iconPosition="left"
                className={isLoading ? 'animate-spin' : ''}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Time Range Selector */}
          <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={handleRangeChange}
            isLoading={isLoading}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chart Section - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2 space-y-6">
              <ForecastChart
                data={forecastData}
                selectedRange={selectedRange}
                onExport={handleExport}
              />
              
              <HourlyBreakdown
                data={forecastData}
                selectedRange={selectedRange}
              />
            </div>

            {/* Summary Section - Takes 1 column on xl screens */}
            <div className="xl:col-span-1">
              <ForecastSummary
                data={forecastData}
                selectedRange={selectedRange}
                onNavigateToRoutes={handleNavigateToRoutes}
                onSetAlert={handleSetAlert}
              />
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  Ready to plan your activities?
                </h3>
                <p className="text-sm text-text-secondary">
                  Use our tools to find safe routes and set personalized alerts
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="default"
                  onClick={handleNavigateToRoutes}
                  iconName="Route"
                  iconPosition="left"
                >
                  Plan Safe Route
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSetAlert}
                  iconName="Bell"
                  iconPosition="left"
                >
                  Set Alerts
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNavigateHome}
                  iconName="Home"
                  iconPosition="left"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AQIForecastScreen;