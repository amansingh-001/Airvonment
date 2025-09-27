import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TimeSeriesControls = ({ onTimeChange, onPlaybackControl, isPlaying }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');

  const periodOptions = [
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '3d', label: 'Last 3 Days' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const speedOptions = [
    { value: '0.5x', label: '0.5x Speed' },
    { value: '1x', label: '1x Speed' },
    { value: '2x', label: '2x Speed' },
    { value: '5x', label: '5x Speed' }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      const speed = parseFloat(playbackSpeed?.replace('x', ''));
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = new Date(prev.getTime() + (60000 * speed)); // 1 minute per step
          onTimeChange(newTime);
          return newTime;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, onTimeChange]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    const now = new Date();
    let startTime;
    
    switch (period) {
      case '6h':
        startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '3d':
        startTime = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    setCurrentTime(startTime);
    onTimeChange(startTime);
  };

  const formatDateTime = (date) => {
    return date?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-card border border-border rounded-lg shadow-lg p-4">
      <div className="flex items-center space-x-4">
        {/* Period Selection */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-secondary" />
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="w-32"
          />
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2 px-3 border-x border-border">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPlaybackControl('previous')}
            className="h-8 w-8"
            title="Previous"
          >
            <Icon name="SkipBack" size={14} />
          </Button>
          
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="icon"
            onClick={() => onPlaybackControl(isPlaying ? 'pause' : 'play')}
            className="h-8 w-8"
            title={isPlaying ? "Pause" : "Play"}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={14} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPlaybackControl('next')}
            className="h-8 w-8"
            title="Next"
          >
            <Icon name="SkipForward" size={14} />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <Icon name="Gauge" size={16} className="text-text-secondary" />
          <Select
            options={speedOptions}
            value={playbackSpeed}
            onChange={setPlaybackSpeed}
            className="w-24"
          />
        </div>

        {/* Current Time Display */}
        <div className="flex items-center space-x-2 px-3 border-l border-border">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm font-data text-text-primary">
            {formatDateTime(currentTime)}
          </span>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const now = new Date();
            setCurrentTime(now);
            onTimeChange(now);
            onPlaybackControl('pause');
          }}
        >
          <Icon name="RotateCcw" size={14} className="mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TimeSeriesControls;