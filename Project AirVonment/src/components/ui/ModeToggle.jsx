import React from 'react';
import Icon from '../AppIcon';

const ModeToggle = ({ currentMode, onModeChange, className = '' }) => {
  const handleToggle = (mode) => {
    if (mode !== currentMode) {
      onModeChange(mode);
    }
  };

  return (
    <div className={`flex items-center bg-muted rounded-lg p-1 ${className}`}>
      <button
        onClick={() => handleToggle('citizen')}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          currentMode === 'citizen' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-text-primary hover:bg-background'
        }`}
        aria-pressed={currentMode === 'citizen'}
        aria-label="Switch to Citizen Mode"
      >
        <Icon name="Users" size={16} className="mr-2" />
        <span className="hidden sm:inline">Citizen</span>
      </button>
      
      <button
        onClick={() => handleToggle('policy')}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          currentMode === 'policy' ?'bg-secondary text-secondary-foreground shadow-sm' :'text-text-secondary hover:text-text-primary hover:bg-background'
        }`}
        aria-pressed={currentMode === 'policy'}
        aria-label="Switch to Policy Mode"
      >
        <Icon name="Building2" size={16} className="mr-2" />
        <span className="hidden sm:inline">Policy</span>
      </button>
    </div>
  );
};

export default ModeToggle;