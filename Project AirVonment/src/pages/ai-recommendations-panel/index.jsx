import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import RecommendationCard from './components/RecommendationCard';
import AIAnalysisPanel from './components/AIAnalysisPanel';
import FilterPanel from './components/FilterPanel';
import ScenarioAnalysisModal from './components/ScenarioAnalysisModal';
import ExportModal from './components/ExportModal';

const AIRecommendationsPanel = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    timeline: 'all',
    confidence: 'all'
  });
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock AI analysis data
  const analysisData = {
    currentAQI: 287,
    aqiStatus: 'Poor',
    temperature: 18,
    weatherCondition: 'Foggy',
    windSpeed: '2.5',
    citizenReports: 47
  };

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: 'rec-001',
      title: 'Emergency Odd-Even Vehicle Scheme Implementation',
      description: 'Implement immediate odd-even vehicle restriction scheme to reduce vehicular emissions by 30-40% during peak pollution period.',
      priority: 'critical',
      category: 'traffic',
      timeline: '2-3 days',
      expectedImpact: '25-35% AQI reduction',
      confidence: 85,
      rationale: `Current AQI levels of 287 indicate severe air quality conditions requiring immediate intervention. Historical data from previous odd-even implementations in Delhi show consistent 25-35% reduction in vehicular emissions. With current weather conditions showing low wind speed (2.5 km/h) and high humidity, vehicular emissions are not dispersing effectively, making this intervention highly effective.`,
      dataSources: ['Real-time AQI monitoring', 'Traffic density data', 'Weather patterns', 'Historical intervention data'],
      similarInterventions: [
        { location: 'Delhi', year: '2019', result: '30% AQI reduction' },
        { location: 'Beijing', year: '2020', result: '28% emission reduction' },
        { location: 'Mexico City', year: '2018', result: '32% traffic reduction' }
      ],
      implementationSteps: [
        { action: 'Issue emergency notification to all stakeholders', timeline: 'Day 1' },
        { action: 'Deploy traffic enforcement teams at key checkpoints', timeline: 'Day 2' },
        { action: 'Activate public transport capacity enhancement', timeline: 'Day 2' },
        { action: 'Launch public awareness campaign', timeline: 'Day 1-3' },
        { action: 'Monitor and adjust implementation based on compliance', timeline: 'Ongoing' }
      ],
      resources: {
        budget: '₹15-20 Crores',
        personnel: '2,500+ enforcement officers',
        duration: '15-30 days'
      }
    },
    {
      id: 'rec-002',
      title: 'Construction Activity Moratorium',
      description: 'Temporary suspension of all non-essential construction activities to eliminate dust emissions and reduce PM2.5 levels.',
      priority: 'high',
      category: 'construction',
      timeline: '1-2 days',
      expectedImpact: '15-20% dust reduction',
      confidence: 78,
      rationale: `Construction activities contribute approximately 20-25% to current PM2.5 levels in NCR region. With current weather conditions showing minimal wind dispersion, construction dust is accumulating in the atmosphere. Immediate moratorium on non-essential construction can provide quick relief while other long-term measures are implemented.`,
      dataSources: ['Construction site monitoring', 'PM2.5 source analysis', 'Meteorological data', 'Satellite imagery'],
      similarInterventions: [
        { location: 'Delhi', year: '2020', result: '18% dust reduction' },
        { location: 'Mumbai', year: '2019', result: '22% PM reduction' },
        { location: 'Bangalore', year: '2021', result: '16% air quality improvement' }
      ],
      implementationSteps: [
        { action: 'Issue construction moratorium order', timeline: 'Day 1' },
        { action: 'Notify all registered construction sites', timeline: 'Day 1' },
        { action: 'Deploy inspection teams for compliance monitoring', timeline: 'Day 2' },
        { action: 'Set up penalty framework for violations', timeline: 'Day 2' },
        { action: 'Review and assess impact after 7 days', timeline: 'Week 1' }
      ],
      resources: {
        budget: '₹5-8 Crores',
        personnel: '500+ inspection officers',
        duration: '7-14 days'
      }
    },
    {
      id: 'rec-003',
      title: 'Enhanced Water Spraying and Road Cleaning',
      description: 'Intensive water spraying on major roads and enhanced mechanical sweeping to suppress road dust and particulate matter.',
      priority: 'high',
      category: 'infrastructure',
      timeline: '1 day',
      expectedImpact: '10-15% dust suppression',
      confidence: 72,
      rationale: `Road dust contributes significantly to PM10 levels, especially during dry weather conditions. Current humidity levels and minimal precipitation make road dust a major contributor. Enhanced water spraying can provide immediate relief by settling airborne particles and preventing re-suspension.`,
      dataSources: ['Road dust monitoring', 'Traffic volume data', 'Weather conditions', 'Municipal cleaning schedules'],
      similarInterventions: [
        { location: 'Delhi', year: '2021', result: '12% dust reduction' },
        { location: 'Gurgaon', year: '2020', result: '15% PM10 reduction' },
        { location: 'Noida', year: '2019', result: '10% air quality improvement' }
      ],
      implementationSteps: [
        { action: 'Deploy additional water tankers on major routes', timeline: 'Day 1' },
        { action: 'Increase frequency of mechanical sweeping', timeline: 'Day 1' },
        { action: 'Focus on high-traffic and construction-adjacent roads', timeline: 'Day 1' },
        { action: 'Coordinate with traffic police for optimal timing', timeline: 'Day 1' },
        { action: 'Monitor effectiveness and adjust coverage', timeline: 'Daily' }
      ],
      resources: {
        budget: '₹3-5 Crores',
        personnel: '200+ sanitation workers',
        duration: '7-10 days'
      }
    },
    {
      id: 'rec-004',
      title: 'Industrial Emission Control Enforcement',
      description: 'Strict enforcement of emission norms for industrial units with immediate closure of non-compliant facilities.',
      priority: 'medium',
      category: 'industrial',
      timeline: '3-5 days',
      expectedImpact: '12-18% industrial emission reduction',
      confidence: 68,
      rationale: `Industrial emissions account for 15-20% of total pollution load in NCR. Current meteorological conditions with low wind speed are preventing effective dispersion of industrial pollutants. Strict enforcement can provide significant reduction in SO2, NOx, and particulate emissions.`,
      dataSources: ['Industrial monitoring data', 'Emission compliance reports', 'Satellite pollution tracking', 'CPCB guidelines'],
      similarInterventions: [
        { location: 'Delhi NCR', year: '2020', result: '16% industrial emission reduction' },
        { location: 'Pune', year: '2019', result: '14% SO2 reduction' },
        { location: 'Chennai', year: '2021', result: '20% NOx reduction' }
      ],
      implementationSteps: [
        { action: 'Conduct surprise inspections of major industrial units', timeline: 'Day 1-2' },
        { action: 'Issue notices to non-compliant facilities', timeline: 'Day 2-3' },
        { action: 'Implement closure orders for severe violators', timeline: 'Day 3-4' },
        { action: 'Set up continuous monitoring systems', timeline: 'Day 4-5' },
        { action: 'Review compliance and adjust measures', timeline: 'Weekly' }
      ],
      resources: {
        budget: '₹8-12 Crores',
        personnel: '150+ inspection officers',
        duration: '14-21 days'
      }
    },
    {
      id: 'rec-005',
      title: 'Public Transport Capacity Enhancement',
      description: 'Increase metro and bus frequency, introduce free public transport to encourage shift from private vehicles.',
      priority: 'medium',
      category: 'traffic',
      timeline: '2-3 days',
      expectedImpact: '8-12% vehicular emission reduction',
      confidence: 75,
      rationale: `Encouraging public transport usage can significantly reduce private vehicle emissions. Current traffic data shows 65% single-occupancy vehicle usage. Free public transport combined with increased frequency can shift 15-20% of private vehicle users to public transport, resulting in measurable emission reduction.`,
      dataSources: ['Public transport ridership data', 'Traffic volume analysis', 'Commuter behavior studies', 'Emission factor calculations'],
      similarInterventions: [
        { location: 'Delhi', year: '2020', result: '10% ridership increase' },
        { location: 'Paris', year: '2019', result: '15% car usage reduction' },
        { location: 'Seoul', year: '2021', result: '12% emission reduction' }
      ],
      implementationSteps: [
        { action: 'Coordinate with Delhi Metro and DTC for increased frequency', timeline: 'Day 1' },
        { action: 'Announce free public transport scheme', timeline: 'Day 1' },
        { action: 'Deploy additional buses on high-demand routes', timeline: 'Day 2' },
        { action: 'Launch awareness campaign for public transport usage', timeline: 'Day 2-3' },
        { action: 'Monitor ridership and adjust services', timeline: 'Daily' }
      ],
      resources: {
        budget: '₹25-30 Crores',
        personnel: '1,000+ transport staff',
        duration: '15-30 days'
      }
    },
    {
      id: 'rec-006',
      title: 'Stubble Burning Hotspot Intervention',
      description: 'Deploy rapid response teams to stubble burning hotspots with alternative disposal methods and farmer incentives.',
      priority: 'critical',
      category: 'agricultural',
      timeline: '1-2 days',
      expectedImpact: '20-30% regional pollution reduction',
      confidence: 82,
      rationale: `Satellite data shows 156 active fire points in Punjab and Haryana contributing 40-45% to current pollution levels. Wind patterns are carrying smoke directly towards NCR. Immediate intervention at hotspots with alternative disposal methods can provide significant relief within 24-48 hours.`,
      dataSources: ['NASA FIRMS fire data', 'Wind pattern analysis', 'Agricultural burning reports', 'Farmer survey data'],
      similarInterventions: [
        { location: 'Punjab', year: '2021', result: '25% burning reduction' },
        { location: 'Haryana', year: '2020', result: '30% hotspot control' },
        { location: 'UP', year: '2019', result: '22% fire incident reduction' }
      ],
      implementationSteps: [
        { action: 'Deploy rapid response teams to identified hotspots', timeline: 'Day 1' },
        { action: 'Distribute alternative disposal equipment to farmers', timeline: 'Day 1-2' },
        { action: 'Implement immediate financial incentives for non-burning', timeline: 'Day 1' },
        { action: 'Set up mobile enforcement units', timeline: 'Day 2' },
        { action: 'Monitor satellite data for new fire points', timeline: 'Continuous' }
      ],
      resources: {
        budget: '₹40-50 Crores',
        personnel: '800+ field officers',
        duration: '10-15 days'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setFilteredRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = recommendations;

    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(rec => rec?.priority === filters?.priority);
    }

    if (filters?.category !== 'all') {
      filtered = filtered?.filter(rec => rec?.category === filters?.category);
    }

    if (filters?.timeline !== 'all') {
      const timelineMap = {
        'immediate': ['1 day', '1-2 days', '2-3 days'],
        'short': ['3-5 days', '1 week', '1-2 weeks'],
        'medium': ['2-4 weeks', '1 month', '1-3 months'],
        'long': ['3-6 months', '6+ months', '1 year+']
      };
      
      if (timelineMap?.[filters?.timeline]) {
        filtered = filtered?.filter(rec => 
          timelineMap?.[filters?.timeline]?.some(timeline => 
            rec?.timeline?.includes(timeline?.split(' ')?.[0])
          )
        );
      }
    }

    if (filters?.confidence !== 'all') {
      const confidenceMap = {
        'high': (conf) => conf >= 80,
        'medium': (conf) => conf >= 60 && conf < 80,
        'low': (conf) => conf < 60
      };
      
      if (confidenceMap?.[filters?.confidence]) {
        filtered = filtered?.filter(rec => confidenceMap?.[filters?.confidence](rec?.confidence));
      }
    }

    setFilteredRecommendations(filtered);
  }, [recommendations, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({
      priority: 'all',
      category: 'all',
      timeline: 'all',
      confidence: 'all'
    });
  };

  const handleViewDetails = (recommendationId) => {
    console.log('Viewing details for recommendation:', recommendationId);
    // In real app, this would navigate to detailed view or open modal
  };

  const handleExportRecommendation = (recommendationId) => {
    console.log('Exporting recommendation:', recommendationId);
    // In real app, this would export individual recommendation
  };

  const handleImplementRecommendation = (recommendationId) => {
    console.log('Starting implementation for recommendation:', recommendationId);
    // In real app, this would start implementation workflow
  };

  const handleScenarioAnalysis = async (scenario) => {
    console.log('Analyzing scenario:', scenario);
    // In real app, this would send scenario to AI for analysis
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleExportAll = async (exportConfig) => {
    console.log('Exporting recommendations with config:', exportConfig);
    // In real app, this would generate and download the export file
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleRegenerateAnalysis = async () => {
    console.log('Regenerating AI analysis...');
    // In real app, this would trigger new AI analysis
    return new Promise(resolve => setTimeout(resolve, 3000));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="space-header">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Brain" size={32} className="text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-text-primary">Generating AI Recommendations</h2>
                  <p className="text-text-secondary">Analyzing current air quality data and generating policy interventions...</p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Processing environmental data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="space-header">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">AI Recommendations Panel</h1>
                  <p className="text-text-secondary">Intelligent policy interventions based on real-time environmental data</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsScenarioModalOpen(true)}
                >
                  <Icon name="TestTube" size={16} className="mr-2" />
                  Scenario Analysis
                </Button>
                <Button
                  variant="default"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-destructive" />
                  <div>
                    <div className="text-lg font-bold text-text-primary">
                      {recommendations?.filter(r => r?.priority === 'critical')?.length}
                    </div>
                    <div className="text-sm text-text-secondary">Critical Actions</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-warning" />
                  <div>
                    <div className="text-lg font-bold text-text-primary">
                      {recommendations?.filter(r => r?.timeline?.includes('1') || r?.timeline?.includes('2'))?.length}
                    </div>
                    <div className="text-sm text-text-secondary">Immediate Actions</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <div>
                    <div className="text-lg font-bold text-text-primary">
                      {Math.round(recommendations?.reduce((acc, r) => acc + r?.confidence, 0) / recommendations?.length)}%
                    </div>
                    <div className="text-sm text-text-secondary">Avg Confidence</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="Target" size={20} className="text-primary" />
                  <div>
                    <div className="text-lg font-bold text-text-primary">25-35%</div>
                    <div className="text-sm text-text-secondary">Expected Impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <AIAnalysisPanel
            analysisData={analysisData}
            onParameterChange={() => {}}
            onRegenerate={handleRegenerateAnalysis}
          />

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleFilterReset}
            totalRecommendations={recommendations?.length}
          />

          {/* Recommendations List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-primary">
                Generated Recommendations ({filteredRecommendations?.length})
              </h2>
              
              {filteredRecommendations?.length !== recommendations?.length && (
                <Button variant="ghost" size="sm" onClick={handleFilterReset}>
                  <Icon name="X" size={16} className="mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>

            {filteredRecommendations?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No recommendations found</h3>
                <p className="text-text-secondary mb-4">Try adjusting your filters to see more recommendations</p>
                <Button variant="outline" onClick={handleFilterReset}>
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecommendations?.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation?.id}
                    recommendation={recommendation}
                    onViewDetails={handleViewDetails}
                    onExport={handleExportRecommendation}
                    onImplement={handleImplementRecommendation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <ScenarioAnalysisModal
        isOpen={isScenarioModalOpen}
        onClose={() => setIsScenarioModalOpen(false)}
        onAnalyze={handleScenarioAnalysis}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        recommendations={recommendations}
        onExport={handleExportAll}
      />
    </div>
  );
};

export default AIRecommendationsPanel;