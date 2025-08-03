import React from 'react';
import { useClientDashboard } from '../../../api/client-dashboard';

interface KpiCardProps {
  title: string;
  leftValue: string;
  leftLabel: string;
  rightValue?: string;
  rightLabel?: string;
  actionLink?: string;
  isLoading?: boolean;
  error?: string | null;
}

function KpiCard({ title, leftValue, leftLabel, rightValue, rightLabel, actionLink, isLoading, error }: KpiCardProps) {
  if (isLoading) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 20px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        animation: 'pulse 1.5s infinite ease-in-out',
      }}>
        <div style={{ width: '80%', height: '20px', backgroundColor: 'var(--skeleton)', borderRadius: '4px' }}></div>
        <div style={{ width: '60%', height: '24px', backgroundColor: 'var(--skeleton)', borderRadius: '4px' }}></div>
        <div style={{ width: '40%', height: '16px', backgroundColor: 'var(--skeleton)', borderRadius: '4px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 20px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        color: 'var(--destructive)',
        textAlign: 'center',
      }}>
        <h3 style={{ fontSize: 'clamp(16px, 2.2vw, 18px)', fontWeight: '600', margin: '0 0 8px' }}>{title}</h3>
        <p>Error loading data.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: 'clamp(16px, 2vw, 20px)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--border)',
    }}>
      <h3 style={{
        fontSize: 'clamp(16px, 2.2vw, 18px)',
        fontWeight: '600',
        color: 'var(--foreground)',
        margin: '0 0 16px 0',
      }}>
        {title}
      </h3>
      
      {rightValue ? (
        // Two-column layout for Time Saved and Money Saved
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            <div style={{
              fontSize: 'clamp(24px, 3.5vw, 28px)',
              fontWeight: '700',
              color: 'var(--foreground)',
            }}>
              {leftValue}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--muted-foreground)',
            }}>
              {leftLabel}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            <div style={{
              fontSize: 'clamp(24px, 3.5vw, 28px)',
              fontWeight: '700',
              color: 'var(--foreground)',
            }}>
              {rightValue}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--muted-foreground)',
            }}>
              {rightLabel}
            </div>
          </div>
        </div>
      ) : (
        // Single value layout for Active Workflows
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(32px, 4.5vw, 36px)',
            fontWeight: '700',
            color: 'var(--foreground)',
          }}>
            {leftValue}
          </div>
          {actionLink && (
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: 'var(--primary)',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              {actionLink} →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function KpiSection() {
  const { data: dashboardData, isLoading, error } = useClientDashboard();

  // Format time values to show hours with 1 decimal place
  const formatTime = (hours: number) => `${hours.toFixed(1)} hrs`;
  
  // Format money values with commas and 2 decimal places
  const formatMoney = (amount: number) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <KpiCard
        title="Time Saved"
        leftValue={dashboardData ? formatTime(dashboardData.timeSaved.last7Days) : "0.0 hrs"}
        leftLabel="Last 7 days"
        rightValue={dashboardData ? formatTime(dashboardData.timeSaved.allTime) : "0.0 hrs"}
        rightLabel="All time"
        isLoading={isLoading}
        error={error?.message}
      />
      
      <KpiCard
        title="Money Saved"
        leftValue={dashboardData ? formatMoney(dashboardData.moneySaved.last7Days) : "$0.00"}
        leftLabel="Last 7 days"
        rightValue={dashboardData ? formatMoney(dashboardData.moneySaved.allTime) : "$0.00"}
        rightLabel="All time"
        isLoading={isLoading}
        error={error?.message}
      />
      
      <KpiCard
        title="Active Workflows"
        leftValue={dashboardData ? dashboardData.activeWorkflows.toString() : "0"}
        leftLabel=""
        actionLink="View workflows"
        isLoading={isLoading}
        error={error?.message}
      />
    </div>
  );
} 