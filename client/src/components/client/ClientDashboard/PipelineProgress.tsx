import React from 'react';
import { useClientPipelineProgress } from '../../../api/pipeline';

interface PipelinePhase {
  id: number;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedAt?: string;
}

export function PipelineProgress() {
  // Fetch pipeline progress data
  const { data: pipelineData, isLoading, error } = useClientPipelineProgress();

  const getStatusColor = (status: PipelinePhase['status']) => {
    switch (status) {
      case 'completed':
        return '#10B981'; // Green
      case 'in_progress':
        return '#3B82F6'; // Blue
      case 'pending':
        return '#D1D5DB'; // Light gray
      default:
        return '#D1D5DB';
    }
  };

  const getStatusText = (phase: PipelinePhase) => {
    switch (phase.status) {
      case 'completed':
        return `Completed ${phase.completedAt}`;
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return '';
      default:
        return '';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 24px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        height: 'fit-content',
      }}>
        <h2 style={{
          fontSize: 'clamp(18px, 2.5vw, 20px)',
          fontWeight: '700',
          color: 'var(--foreground)',
          margin: '0 0 20px 0',
        }}>
          Pipeline Progress
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--muted)',
                flexShrink: 0,
                marginTop: '4px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }} />
              <div style={{
                height: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                flex: 1,
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 24px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        height: 'fit-content',
      }}>
        <h2 style={{
          fontSize: 'clamp(18px, 2.5vw, 20px)',
          fontWeight: '700',
          color: 'var(--foreground)',
          margin: '0 0 20px 0',
        }}>
          Pipeline Progress
        </h2>
        
        <div style={{
          color: 'var(--destructive)',
          fontSize: '14px',
          textAlign: 'center',
          padding: '20px',
        }}>
          Error loading pipeline data
        </div>
      </div>
    );
  }

  // Transform server data to component format
  const pipelinePhases: PipelinePhase[] = pipelineData?.pipelineProgress?.map((phase, index) => ({
    id: index + 1,
    name: phase.phaseName,
    status: phase.status === 'not_started' ? 'pending' : phase.status as PipelinePhase['status'],
    completedAt: phase.completedAt ? new Date(phase.completedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : undefined,
  })) || [];

  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: 'clamp(16px, 2vw, 24px)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--border)',
      height: 'fit-content',
    }}>
      <h2 style={{
        fontSize: 'clamp(18px, 2.5vw, 20px)',
        fontWeight: '700',
        color: 'var(--foreground)',
        margin: '0 0 20px 0',
      }}>
        Pipeline Progress
      </h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {pipelinePhases.length > 0 ? (
          pipelinePhases.map((phase) => (
            <div key={phase.id} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}>
              {/* Status Indicator */}
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(phase.status),
                flexShrink: 0,
                marginTop: '4px',
              }} />
              
              {/* Phase Content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}>
                <div style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  fontWeight: '600',
                  color: 'var(--foreground)',
                  lineHeight: '1.4',
                }}>
                  {phase.name}
                </div>
                {getStatusText(phase) && (
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--muted-foreground)',
                    lineHeight: '1.3',
                  }}>
                    {getStatusText(phase)}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            color: 'var(--muted-foreground)',
            fontSize: '14px',
            textAlign: 'center',
            padding: '20px',
          }}>
            No pipeline phases found
          </div>
        )}
      </div>
    </div>
  );
} 