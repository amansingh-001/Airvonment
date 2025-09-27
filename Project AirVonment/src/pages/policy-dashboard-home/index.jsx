import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeed from './components/ActivityFeed';
import DataExportPanel from './components/DataExportPanel';
import RegionalOverview from './components/RegionalOverview';

const PolicyDashboardHome = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock KPI data
  const kpiData = [
    {
      title: "Regional AQI Average",
      value: "156",
      unit: "AQI",
      trend: "up",
      trendValue: "+12%",
      icon: "Gauge",
      color: "destructive",
      description: "24-hour average across NCR"
    },
    {
      title: "Active Monitoring Stations",
      value: "47",
      unit: "stations",
      trend: "stable",
      trendValue: "0%",
      icon: "Radio",
      color: "primary",
      description: "Real-time data collection points"
    },
    {
      title: "Citizen Reports Today",
      value: "23",
      unit: "reports",
      trend: "down",
      trendValue: "-8%",
      icon: "Users",
      color: "secondary",
      description: "User-submitted pollution incidents"
    },
    {
      title: "Policy Interventions",
      value: "5",
      unit: "active",
      trend: "up",
      trendValue: "+2",
      icon: "Shield",
      color: "success",
      description: "Currently implemented measures"
    }
  ];

  // Mock quick action data
  const quickActions = [
    {
      title: "Source Contribution Analytics",
      description: "Analyze pollution sources with detailed breakdowns of traffic, industry, stubble burning, and dust contributions across different regions.",
      icon: "PieChart",
      route: "/hotspot-map-view",
      color: "primary",
      badge: "Updated"
    },
    {
      title: "Intervention Simulation",
      description: "Model the impact of policy interventions like odd-even schemes, firecracker bans, and industrial restrictions on air quality.",
      icon: "Brain",
      route: "/ai-recommendations-panel",
      color: "secondary",
      badge: "AI Powered"
    },
    {
      title: "Hotspot Mapping",
      description: "Interactive visualization of pollution hotspots with NASA FIRMS fire data and real-time air quality measurements.",
      icon: "Map",
      route: "/hotspot-map-view",
      color: "accent"
    },
    {
      title: "AI Recommendations",
      description: "Get intelligent policy suggestions based on current air quality patterns, weather conditions, and historical intervention data.",
      icon: "Lightbulb",
      route: "/ai-recommendations-panel",
      color: "warning",
      badge: "New"
    }
  ];

  // Mock activity feed data
  const recentActivities = [
    {
      id: 1,
      type: "alert",
      priority: "high",
      title: "AQI Threshold Exceeded",
      description: "Gurgaon region has crossed 200 AQI mark. Immediate intervention recommended.",
      timestamp: new Date(Date.now() - 300000),
      location: "Gurgaon"
    },
    {
      id: 2,
      type: "report",
      priority: "medium",
      title: "Citizen Report: Construction Dust",
      description: "Multiple reports of uncontrolled dust from construction site near Connaught Place.",
      timestamp: new Date(Date.now() - 900000),
      location: "Central Delhi"
    },
    {
      id: 3,
      type: "simulation",
      priority: "low",
      title: "Odd-Even Impact Analysis Complete",
      description: "Simulation shows 15% AQI reduction potential with odd-even implementation.",
      timestamp: new Date(Date.now() - 1800000),
      location: "Delhi NCR"
    },
    {
      id: 4,
      type: "update",
      priority: "medium",
      title: "New Monitoring Station Online",
      description: "Station DL-47 in Dwarka is now providing real-time air quality data.",
      timestamp: new Date(Date.now() - 3600000),
      location: "Dwarka"
    },
    {
      id: 5,
      type: "alert",
      priority: "high",
      title: "Fire Hotspots Detected",
      description: "NASA FIRMS data shows 12 new fire hotspots in Punjab affecting NCR air quality.",
      timestamp: new Date(Date.now() - 7200000),
      location: "Punjab Border"
    }
  ];

  // Mock regional data
  const regionalData = [
    {
      id: 1,
      name: "Central Delhi",
      area: "Connaught Place, India Gate",
      aqi: 145,
      pm25: 89,
      pm10: 156,
      no2: 45,
      stations: 8,
      trend: "up",
      trendValue: "+8%",
      lastUpdated: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      name: "Gurgaon",
      area: "Cyber City, DLF",
      aqi: 178,
      pm25: 112,
      pm10: 189,
      no2: 52,
      stations: 6,
      trend: "up",
      trendValue: "+15%",
      lastUpdated: new Date(Date.now() - 180000)
    },
    {
      id: 3,
      name: "Noida",
      area: "Sector 62, Greater Noida",
      aqi: 134,
      pm25: 78,
      pm10: 142,
      no2: 38,
      stations: 5,
      trend: "down",
      trendValue: "-5%",
      lastUpdated: new Date(Date.now() - 420000)
    },
    {
      id: 4,
      name: "Faridabad",
      area: "Industrial Area, NIT",
      aqi: 162,
      pm25: 95,
      pm10: 171,
      no2: 48,
      stations: 4,
      trend: "stable",
      trendValue: "0%",
      lastUpdated: new Date(Date.now() - 600000)
    },
    {
      id: 5,
      name: "Ghaziabad",
      area: "Indirapuram, Vasundhara",
      aqi: 149,
      pm25: 87,
      pm10: 158,
      no2: 41,
      stations: 3,
      trend: "down",
      trendValue: "-3%",
      lastUpdated: new Date(Date.now() - 480000)
    },
    {
      id: 6,
      name: "East Delhi",
      area: "Laxmi Nagar, Preet Vihar",
      aqi: 141,
      pm25: 82,
      pm10: 149,
      no2: 43,
      stations: 7,
      trend: "up",
      trendValue: "+6%",
      lastUpdated: new Date(Date.now() - 360000)
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      setCurrentTime(new Date());
    }, 1500);
  };

  const handleEmergencyAlert = () => {
    // In real app, this would trigger emergency alert system
    alert('Emergency alert system would be activated');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-header px-4 lg:px-6 pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Policy Dashboard</h1>
              <p className="text-text-secondary">
                Comprehensive air quality monitoring and policy intervention tools for NCR region
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">
                  {currentTime?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Asia/Kolkata'
                  })} IST
                </span>
              </div>
              
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleEmergencyAlert}
                iconName="AlertTriangle"
                iconPosition="left"
              >
                Emergency Alert
              </Button>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <div>
                <p className="font-medium text-text-primary">Air Quality Alert</p>
                <p className="text-sm text-text-secondary">
                  Current regional AQI is in unhealthy range. Consider implementing immediate interventions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData?.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Policy Tools & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions?.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <ActivityFeed activities={recentActivities} />
          </div>
        </div>

        {/* Regional Overview */}
        <div className="mb-8">
          <RegionalOverview regions={regionalData} />
        </div>

        {/* Data Export Panel */}
        <div>
          <DataExportPanel />
        </div>
      </main>
    </div>
  );
};

export default PolicyDashboardHome;