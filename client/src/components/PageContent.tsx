import React from 'react';

interface PageContentProps {
  title: string;
}

export function PageContent({ title }: PageContentProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>All Clients</h2>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          padding: '8px 12px',
          borderRadius: 'var(--radius)',
          border: 'none',
          cursor: 'pointer'
        }}>
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
        flex: 1
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '12px' }}>Client Name</th>
              <th style={{ padding: '12px' }}>Contract Start</th>
              <th style={{ padding: '12px' }}>Workflows</th>
              <th style={{ padding: '12px' }}>Nodes</th>
              <th style={{ padding: '12px' }}>Executions</th>
              <th style={{ padding: '12px' }}>Exceptions</th>
              <th style={{ padding: '12px' }}>Revenue</th>
              <th style={{ padding: '12px' }}>Time Saved</th>
              <th style={{ padding: '12px' }}>Money Saved</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '12px' }}><a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Acme Corp</a></td>
              <td style={{ padding: '12px' }}>Jan 15, 2025</td>
              <td style={{ padding: '12px' }}>24</td>
              <td style={{ padding: '12px' }}>156</td>
              <td style={{ padding: '12px' }}>1,847</td>
              <td style={{ padding: '12px' }}>12</td>
              <td style={{ padding: '12px' }}>$24,500</td>
              <td style={{ padding: '12px' }}>284h</td>
              <td style={{ padding: '12px' }}>$42,600</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 