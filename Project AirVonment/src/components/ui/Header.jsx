import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState('citizen');
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current mode based on route
  React.useEffect(() => {
    if (location?.pathname?.includes('policy')) {
      setCurrentMode('policy');
    } else {
      setCurrentMode('citizen');
    }
  }, [location?.pathname]);

  const citizenNavItems = [
    { label: 'Home', path: '/citizen-home-dashboard', icon: 'Home' },
    { label: 'AQI Forecast', path: '/aqi-forecast-screen', icon: 'CloudSun' },
    { label: 'Safe Routes', path: '/safe-route-planner', icon: 'Route' },
  ];

  const policyNavItems = [
    { label: 'Dashboard', path: '/policy-dashboard-home', icon: 'BarChart3' },
    { label: 'Hotspot Map', path: '/hotspot-map-view', icon: 'Map' },
    { label: 'AI Insights', path: '/ai-recommendations-panel', icon: 'Brain' },
  ];

  const currentNavItems = currentMode === 'citizen' ? citizenNavItems : policyNavItems;

  const handleModeToggle = () => {
    const newMode = currentMode === 'citizen' ? 'policy' : 'citizen';
    setCurrentMode(newMode);
    
    if (newMode === 'citizen') {
      navigate('/citizen-home-dashboard');
    } else {
      navigate('/policy-dashboard-home');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Wind" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-heading font-bold text-text-primary leading-tight">
              AirSense NCR
            </h1>
            <span className="text-xs font-caption text-text-secondary leading-none">
              Environmental Monitor
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {currentNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-item ${
                isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
              }`}
            >
              <Icon name={item?.icon} size={18} className="mr-2" />
              {item?.label}
            </button>
          ))}
        </nav>

        {/* Mode Toggle & Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={handleModeToggle}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                currentMode === 'citizen' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Users" size={16} className="mr-1.5" />
              Citizen
            </button>
            <button
              onClick={handleModeToggle}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                currentMode === 'policy' ?'bg-secondary text-secondary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Building2" size={16} className="mr-1.5" />
              Policy
            </button>
          </div>

          {/* Location Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
            <Icon name="MapPin" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Delhi NCR</span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {currentNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full nav-item justify-start ${
                  isActivePath(item?.path) ? 'nav-item-active' : 'nav-item-inactive'
                }`}
              >
                <Icon name={item?.icon} size={18} className="mr-3" />
                {item?.label}
              </button>
            ))}
            
            {/* Mobile Location */}
            <div className="flex items-center space-x-3 px-3 py-2 mt-3 pt-3 border-t border-border">
              <Icon name="MapPin" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">Delhi NCR</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;