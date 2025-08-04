import React, { Suspense } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

// Lazy load sub-components
const PipelineProgress = React.lazy(() => import('./PipelineProgress').then(module => ({ default: module.PipelineProgress })));
const KpiSection = React.lazy(() => import('./KpiSection').then(module => ({ default: module.KpiSection })));
const UserProfile = React.lazy(() => import('./UserProfile').then(module => ({ default: module.UserProfile })));

// Loading fallback for sub-components
function ComponentLoadingFallback() {
  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: 'clamp(16px, 2vw, 24px)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      minHeight: '200px',
    }}>
      <div style={{
        width: '60%',
        height: '24px',
        backgroundColor: 'var(--skeleton)',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite ease-in-out',
      }} />
      <div style={{
        width: '80%',
        height: '16px',
        backgroundColor: 'var(--skeleton)',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite ease-in-out',
      }} />
      <div style={{
        width: '40%',
        height: '16px',
        backgroundColor: 'var(--skeleton)',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite ease-in-out',
      }} />
    </div>
  );
}

export function LazyClientDashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? '1fr' 
        : isTablet 
          ? '1fr 1fr' 
          : '300px 1fr 280px',
      gridTemplateRows: 'auto',
      gridTemplateAreas: isMobile
        ? `"pipeline"
           "kpi"
           "profile"`
        : isTablet
          ? `"pipeline kpi"
             "profile profile"`
          : `"pipeline kpi profile"`,
      gap: isMobile ? '20px' : '24px',
      padding: isMobile ? '16px' : '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      alignItems: 'start',
    }}>
      {/* Pipeline Progress - Left Column */}
      <div style={{
        gridArea: 'pipeline',
        minWidth: isMobile ? 'auto' : '280px',
        maxWidth: isMobile ? 'auto' : '350px',
        justifySelf: isMobile ? 'stretch' : 'start',
      }}>
        <Suspense fallback={<ComponentLoadingFallback />}>
          <PipelineProgress />
        </Suspense>
      </div>
      
      {/* KPI Section - Middle Column */}
      <div style={{
        gridArea: 'kpi',
        minWidth: isMobile ? 'auto' : '300px',
        justifySelf: isMobile ? 'stretch' : 'stretch',
      }}>
        <Suspense fallback={<ComponentLoadingFallback />}>
          <KpiSection />
        </Suspense>
      </div>
      
      {/* User Profile - Right Column */}
      <div style={{
        gridArea: 'profile',
        minWidth: isMobile ? 'auto' : '250px',
        maxWidth: isMobile ? 'auto' : '320px',
        justifySelf: isMobile ? 'stretch' : 'end',
      }}>
        <Suspense fallback={<ComponentLoadingFallback />}>
          <UserProfile />
        </Suspense>
      </div>
    </div>
  );
} 