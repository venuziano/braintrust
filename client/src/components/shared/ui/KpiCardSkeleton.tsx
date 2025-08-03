import React from 'react'

export function KpiCardSkeleton() {
  return (
    <div style={{
      backgroundColor: 'var(--card)',
      color: 'var(--card-foreground)',
      borderRadius: 'var(--radius)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '1rem',
      width: '100%',
      border: '1px solid var(--border)',
      height: '141px'
    }}>
      {/* header skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          lineHeight: '1.25',
        }}>
          <div style={{
            width: '80px',
            height: '14px',
            backgroundColor: 'var(--muted)',
            borderRadius: '4px',
            marginBottom: '4px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          <div style={{
            width: '60px',
            height: '14px',
            backgroundColor: 'var(--muted)',
            borderRadius: '4px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem',
          fontWeight: '600',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'var(--muted)',
            borderRadius: '2px',
            marginRight: '4px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          <div style={{
            width: '30px',
            height: '12px',
            backgroundColor: 'var(--muted)',
            borderRadius: '2px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
        </div>
      </div>

      {/* big number skeleton */}
      <div style={{
        marginTop: '2rem',
        fontSize: '2.25rem',
        fontWeight: '700',
      }}>
        <div style={{
          width: '120px',
          height: '36px',
          backgroundColor: 'var(--muted)',
          borderRadius: '4px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }} />
      </div>
    </div>
  )
} 