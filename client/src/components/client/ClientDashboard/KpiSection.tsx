import React from 'react';

interface KpiCardProps {
  title: string;
  leftValue: string;
  leftLabel: string;
  rightValue?: string;
  rightLabel?: string;
  actionLink?: string;
}

function KpiCard({ title, leftValue, leftLabel, rightValue, rightLabel, actionLink }: KpiCardProps) {
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
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <KpiCard
        title="Time Saved"
        leftValue="24.5 hrs"
        leftLabel="Last 7 days"
        rightValue="168.2 hrs"
        rightLabel="All time"
      />
      
      <KpiCard
        title="Money Saved"
        leftValue="$2,450"
        leftLabel="Last 7 days"
        rightValue="$16,820"
        rightLabel="All time"
      />
      
      <KpiCard
        title="Active Workflows"
        leftValue="12"
        leftLabel=""
        actionLink="View workflows"
      />
    </div>
  );
} 