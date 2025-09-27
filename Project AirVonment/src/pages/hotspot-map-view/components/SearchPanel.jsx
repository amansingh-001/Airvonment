import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchPanel = ({ onSearch, onLocationSelect, isCollapsed, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [selectedBoundary, setSelectedBoundary] = useState('');

  const boundaryOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'noida', label: 'Noida' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'ghaziabad', label: 'Ghaziabad' },
    { value: 'ncr', label: 'Entire NCR' }
  ];

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleCoordinateSearch = () => {
    if (coordinates?.lat && coordinates?.lng) {
      onLocationSelect({
        lat: parseFloat(coordinates?.lat),
        lng: parseFloat(coordinates?.lng)
      });
    }
  };

  const handleBoundarySelect = (value) => {
    setSelectedBoundary(value);
    onLocationSelect({ boundary: value });
  };

  return (
    <div className={`absolute top-4 left-4 z-10 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        {!isCollapsed && (
          <h3 className="text-sm font-semibold text-text-primary flex items-center">
            <Icon name="Search" size={16} className="mr-2" />
            Search & Navigate
          </h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </Button>
      </div>
      {/* Search Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Text Search */}
          <div>
            <label className="text-xs font-medium text-text-secondary mb-2 block">
              Search Location
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter location name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSearch}
                disabled={!searchQuery?.trim()}
              >
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </div>

          {/* Coordinate Search */}
          <div>
            <label className="text-xs font-medium text-text-secondary mb-2 block">
              Search by Coordinates
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Latitude"
                  value={coordinates?.lat}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e?.target?.value }))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Longitude"
                  value={coordinates?.lng}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lng: e?.target?.value }))}
                  className="flex-1"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCoordinateSearch}
                disabled={!coordinates?.lat || !coordinates?.lng}
                className="w-full"
              >
                <Icon name="Navigation" size={14} className="mr-2" />
                Go to Coordinates
              </Button>
            </div>
          </div>

          {/* Administrative Boundaries */}
          <div>
            <Select
              label="Administrative Boundary"
              placeholder="Select region..."
              options={boundaryOptions}
              value={selectedBoundary}
              onChange={handleBoundarySelect}
              className="w-full"
            />
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLocationSelect({ type: 'current' })}
              >
                <Icon name="MapPin" size={14} className="mr-1" />
                My Location
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLocationSelect({ type: 'center' })}
              >
                <Icon name="Target" size={14} className="mr-1" />
                NCR Center
              </Button>
            </div>
          </div>

          {/* Recent Searches */}
          <div>
            <label className="text-xs font-medium text-text-secondary mb-2 block">
              Recent Searches
            </label>
            <div className="space-y-1">
              {['Connaught Place', 'Gurgaon Sector 29', 'Noida City Center']?.map((location, index) => (
                <button
                  key={index}
                  onClick={() => onSearch(location)}
                  className="w-full text-left px-2 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded transition-colors duration-200"
                >
                  <Icon name="Clock" size={12} className="mr-2 inline" />
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;