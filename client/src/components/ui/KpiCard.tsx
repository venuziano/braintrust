import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

type KpiCardProps = {
  label: string         // e.g. "Total Workflows"
  value: number
  changePercentage: number
  changeDirection: 'up' | 'down'
}

export function KpiCard({
  label,
  value,
  changePercentage,
  changeDirection,
}: KpiCardProps) {
  const isUp = changeDirection === 'up'

  // split "Total Workflows" into two lines
  const [firstLine, ...rest] = label.split(' ')
  const secondLine = rest.join(' ')

  return (
    <div style={{
      backgroundColor: 'var(--card)',
      color: 'var(--card-foreground)',
      borderRadius: 'var(--radius)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '1rem',
      width: '100%',
      border: '1px solid var(--border)',
    }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          lineHeight: '1.25',
          color: 'var(--muted-foreground)'
        }}>
          <div>{firstLine}</div>
          <div>{secondLine}</div>
        </div>

        <span style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem',
          fontWeight: '600',
          color: isUp ? 'var(--chart-2)' : 'var(--destructive)'
        }}>
          {isUp ? (
            <ArrowUp style={{ width: '12px', height: '12px' }} />
          ) : (
            <ArrowDown style={{ width: '12px', height: '12px' }} />
          )}
          <span style={{ marginLeft: '0.25rem' }}>{changePercentage}%</span>
        </span>
      </div>

      {/* big number */}
      <div style={{
        marginTop: '1rem',
        fontSize: '2.25rem',
        fontWeight: '700',
        color: 'var(--foreground)'
      }}>
        {value.toLocaleString()}
      </div>
    </div>
  )
}
