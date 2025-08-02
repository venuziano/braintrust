import React, { useState } from 'react';
import { useClients } from '../api/clients';
import { useTotalWorkflows } from '../api/workflows';
import { KpiCard } from './layout/KpiCard';
import { KpiCardSkeleton } from './layout/KpiCardSkeleton';
import type { TimePeriod } from '../../../server/src/modules/workflows/application/dto/get-total-workflows-kpi.dto';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface PageContentProps {
  title: string;
}

// Map display labels to TimePeriod enum values
const TIME_PERIOD_OPTIONS: Array<{ label: string; value: TimePeriod }> = [
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'MTD', value: 'mtd' },
  { label: 'QTD', value: 'qtd' },
  { label: 'YTD', value: 'ytd' },
  { label: 'ITD', value: 'itd' },
];

// Time Period Filters Component
function TimePeriodFilters({ 
  selectedTimePeriod, 
  onTimePeriodChange 
}: { 
  selectedTimePeriod: TimePeriod; 
  onTimePeriodChange: (period: TimePeriod) => void; 
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      padding: '16px 0',
      borderBottom: '1px solid var(--border)',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      overflowX: isMobile ? 'auto' : 'visible',
    }}>
      {TIME_PERIOD_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onTimePeriodChange(option.value)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            backgroundColor: selectedTimePeriod === option.value ? 'var(--foreground)' : 'var(--background)',
            color: selectedTimePeriod === option.value ? 'var(--background)' : 'var(--foreground)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (selectedTimePeriod !== option.value) {
              e.currentTarget.style.backgroundColor = 'var(--muted)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedTimePeriod !== option.value) {
              e.currentTarget.style.backgroundColor = 'var(--background)';
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// KPI Section Component
function KpiSection({ selectedTimePeriod }: { selectedTimePeriod: TimePeriod }) {
  const { data: workflowsData, isLoading, error } = useTotalWorkflows(selectedTimePeriod);

  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isLoading) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px' 
      }}>
        <KpiCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px' 
      }}>
        <div style={{ 
          backgroundColor: 'var(--card)', 
          borderRadius: 'var(--radius)', 
          padding: '1rem',
          border: '1px solid var(--border)',
          color: 'var(--destructive)'
        }}>
          Error loading KPI: {error.message}
        </div>
      </div>
    );
  }

  if (!workflowsData) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px' 
      }}>
        <div style={{ 
          backgroundColor: 'var(--card)', 
          borderRadius: 'var(--radius)', 
          padding: '1rem',
          border: '1px solid var(--border)',
          color: 'var(--muted-foreground)'
        }}>
          No KPI data available
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '16px' 
    }}>
      <KpiCard
        label={workflowsData.label}
        value={workflowsData.value}
        changePercentage={workflowsData.changePercentage}
        changeDirection={workflowsData.changeDirection}
      />
    </div>
  );
}

// Clients Table Component
function ClientsTable() {
  const { data: clientsData, isLoading, error } = useClients();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isLoading) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)',
        textAlign: 'center',
        color: 'var(--muted-foreground)'
      }}>
        Loading clients...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)',
        textAlign: 'center',
        color: 'var(--destructive)'
      }}>
        Error loading clients: {error.message}
      </div>
    );
  }

  if (!clientsData) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)',
        textAlign: 'center',
        color: 'var(--muted-foreground)'
      }}>
        No clients data available
      </div>
    );
  }

  return (
    <>
      {/* Card Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '12px' : '0',
        alignItems: isMobile ? 'stretch' : 'center',
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '18px' : '20px', 
          fontWeight: '600', 
          color: 'var(--foreground)', 
          margin: 0 
        }}>
          All Clients
        </h2>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          padding: '8px 16px',
          borderRadius: 'var(--radius)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        >
          + Add Client
        </button>
      </div>

      {/* Card Table */}
      <div style={{
        backgroundColor: 'var(--card)',
        color: 'var(--card-foreground)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        overflowX: 'auto',
        flex: 1,
        border: '1px solid var(--border)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Client Name</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Contract Start</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Workflows</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Nodes</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Executions</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Exceptions</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Revenue</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Time Saved</th>
              <th style={{ padding: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Money Saved</th>
            </tr>
          </thead>
          <tbody>
            {clientsData.map(c => (
              <tr
                key={c.id}
                style={{ 
                  borderBottom: '1px solid var(--border)',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{ padding: '12px' }}>
                  <a
                    href={`/clients/${c.id}`}
                    style={{ 
                      color: 'var(--primary)', 
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {c.name}
                  </a>
                </td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground)' }}>{c.contractStart}</td>
                <td style={{ padding: '12px' }}>{c.workflowsCount}</td>
                <td style={{ padding: '12px' }}>{c.nodesCount}</td>
                <td style={{ padding: '12px' }}>{c.executionsCount}</td>
                <td style={{ padding: '12px' }}>{c.exceptionsCount}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>${c.revenue.toLocaleString()}</td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground)' }}>{c.timeSaved}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>${c.moneySaved.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function PageContent({ title }: PageContentProps) {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('itd');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Time Period Filters */}
      <TimePeriodFilters 
        selectedTimePeriod={selectedTimePeriod}
        onTimePeriodChange={setSelectedTimePeriod}
      />

      {/* KPI Section */}
      <KpiSection selectedTimePeriod={selectedTimePeriod} />

      {/* Clients Table */}
      <ClientsTable />
    </div>
  );
} 