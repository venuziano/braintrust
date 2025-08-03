import React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { PipelineProgress } from './PipelineProgress';
import { KpiSection } from './KpiSection';
import { UserProfile } from './UserProfile';

export function ClientDashboard() {
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
        <PipelineProgress />
      </div>
      
      {/* KPI Section - Middle Column */}
      <div style={{
        gridArea: 'kpi',
        minWidth: isMobile ? 'auto' : '300px',
        justifySelf: isMobile ? 'stretch' : 'stretch',
      }}>
        <KpiSection />
      </div>
      
      {/* User Profile - Right Column */}
      <div style={{
        gridArea: 'profile',
        minWidth: isMobile ? 'auto' : '250px',
        maxWidth: isMobile ? 'auto' : '320px',
        justifySelf: isMobile ? 'stretch' : 'end',
      }}>
        <UserProfile />
      </div>
    </div>
  );
} 