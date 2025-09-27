import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LocationInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  onLocationSelect,
  showCurrentLocation = false,
  recentLocations = [],
  favoriteLocations = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Mock suggestions based on search query
  const mockSuggestions = [
    { id: 1, name: "Connaught Place, New Delhi", type: "landmark", aqi: 156 },
    { id: 2, name: "India Gate, New Delhi", type: "landmark", aqi: 142 },
    { id: 3, name: "Gurgaon Cyber City", type: "business", aqi: 178 },
    { id: 4, name: "Noida Sector 62", type: "residential", aqi: 134 },
    { id: 5, name: "Dwarka Metro Station", type: "transport", aqi: 165 },
    { id: 6, name: "Karol Bagh Market", type: "commercial", aqi: 189 },
    { id: 7, name: "Lajpat Nagar Central Market", type: "commercial", aqi: 172 },
    { id: 8, name: "Rajouri Garden", type: "residential", aqi: 158 }
  ];

  const filteredSuggestions = mockSuggestions?.filter(location =>
    location?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  )?.slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e?.target?.value;
    setSearchQuery(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleLocationSelect = (location) => {
    setSearchQuery(location?.name);
    onChange(location?.name);
    onLocationSelect && onLocationSelect(location);
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    const currentLoc = {
      id: 'current',
      name: 'Current Location (Connaught Place)',
      type: 'current',
      aqi: 156
    };
    handleLocationSelect(currentLoc);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'current': return 'MapPin';
      case 'landmark': return 'Landmark';
      case 'business': return 'Building2';
      case 'residential': return 'Home';
      case 'transport': return 'Train';
      case 'commercial': return 'ShoppingBag';
      default: return 'MapPin';
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 150) return 'text-orange-600';
    if (aqi <= 200) return 'text-red-600';
    return 'text-purple-600';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          label={label}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pr-10"
        />
        <div className="absolute right-3 top-9 flex items-center space-x-1">
          {showCurrentLocation && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCurrentLocation}
              title="Use current location"
            >
              <Icon name="Crosshair" size={14} />
            </Button>
          )}
          <Icon name="Search" size={16} className="text-text-secondary" />
        </div>
      </div>
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {/* Current Location Option */}
          {showCurrentLocation && (
            <button
              onClick={handleCurrentLocation}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 border-b border-border"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                  <Icon name="Crosshair" size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">Use Current Location</div>
                  <div className="text-sm text-text-secondary">Connaught Place, New Delhi</div>
                </div>
                <div className={`text-xs font-medium ${getAQIColor(156)}`}>
                  AQI 156
                </div>
              </div>
            </button>
          )}

          {/* Recent Locations */}
          {recentLocations?.length > 0 && searchQuery === '' && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide bg-muted/50">
                Recent
              </div>
              {recentLocations?.slice(0, 3)?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={16} className="text-text-secondary" />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{location?.name}</div>
                    </div>
                    <div className={`text-xs font-medium ${getAQIColor(location?.aqi)}`}>
                      AQI {location?.aqi}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Favorites */}
          {favoriteLocations?.length > 0 && searchQuery === '' && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide bg-muted/50">
                Favorites
              </div>
              {favoriteLocations?.slice(0, 3)?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Heart" size={16} className="text-red-500" />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{location?.name}</div>
                    </div>
                    <div className={`text-xs font-medium ${getAQIColor(location?.aqi)}`}>
                      AQI {location?.aqi}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div>
              {filteredSuggestions?.length > 0 ? (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide bg-muted/50">
                    Suggestions
                  </div>
                  {filteredSuggestions?.map((location) => (
                    <button
                      key={location?.id}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                          <Icon name={getLocationIcon(location?.type)} size={16} className="text-text-secondary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-text-primary">{location?.name}</div>
                          <div className="text-sm text-text-secondary capitalize">{location?.type}</div>
                        </div>
                        <div className={`text-xs font-medium ${getAQIColor(location?.aqi)}`}>
                          AQI {location?.aqi}
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-4 py-6 text-center text-text-secondary">
                  <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No locations found</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;