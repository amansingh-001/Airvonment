import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HotspotMapView from './pages/hotspot-map-view';
import PolicyDashboardHome from './pages/policy-dashboard-home';
import AIRecommendationsPanel from './pages/ai-recommendations-panel';
import CitizenHomeDashboard from './pages/citizen-home-dashboard';
import AQIForecastScreen from './pages/aqi-forecast-screen';
import SafeRoutePlanner from './pages/safe-route-planner';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIRecommendationsPanel />} />
        <Route path="/hotspot-map-view" element={<HotspotMapView />} />
        <Route path="/policy-dashboard-home" element={<PolicyDashboardHome />} />
        <Route path="/ai-recommendations-panel" element={<AIRecommendationsPanel />} />
        <Route path="/citizen-home-dashboard" element={<CitizenHomeDashboard />} />
        <Route path="/aqi-forecast-screen" element={<AQIForecastScreen />} />
        <Route path="/safe-route-planner" element={<SafeRoutePlanner />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
