import React from 'react';
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

interface ClientDashboardProps {
  title: string;
}

export function ClientDashboard({ title }: ClientDashboardProps) {
  // Mock data for client dashboard
  const clientMetrics = {
    totalROI: 245.8,
    timeSaved: 127.5,
    costSavings: 18420,
    workflowsActive: 12,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Section */}
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        border: '1px solid var(--border)',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--foreground)',
          margin: '0 0 8px 0',
        }}>
          Welcome to Your Client Dashboard
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--muted-foreground)',
          margin: 0,
        }}>
          Track your automation ROI and performance metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      }}>
        {/* ROI Card */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              backgroundColor: 'var(--chart-2)',
              borderRadius: 'var(--radius)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TrendingUp style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: 0,
            }}>
              Total ROI
            </h3>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '8px',
          }}>
            {clientMetrics.totalROI}%
          </div>
          <p style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            margin: 0,
          }}>
            Return on investment from automation
          </p>
        </div>

        {/* Time Saved Card */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              backgroundColor: 'var(--chart-3)',
              borderRadius: 'var(--radius)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Clock style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: 0,
            }}>
              Time Saved
            </h3>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '8px',
          }}>
            {clientMetrics.timeSaved}h
          </div>
          <p style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            margin: 0,
          }}>
            Hours saved this month
          </p>
        </div>

        {/* Cost Savings Card */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              backgroundColor: 'var(--chart-4)',
              borderRadius: 'var(--radius)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <DollarSign style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: 0,
            }}>
              Cost Savings
            </h3>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '8px',
          }}>
            ${clientMetrics.costSavings.toLocaleString()}
          </div>
          <p style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            margin: 0,
          }}>
            Money saved this month
          </p>
        </div>

        {/* Active Workflows Card */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              backgroundColor: 'var(--chart-5)',
              borderRadius: 'var(--radius)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Target style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: 0,
            }}>
              Active Workflows
            </h3>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '8px',
          }}>
            {clientMetrics.workflowsActive}
          </div>
          <p style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            margin: 0,
          }}>
            Currently running automations
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        border: '1px solid var(--border)',
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--foreground)',
          margin: '0 0 16px 0',
        }}>
          Recent Activity
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: 'var(--muted)',
            borderRadius: 'var(--radius)',
          }}>
            <span style={{ color: 'var(--foreground)' }}>Invoice Processing workflow completed</span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>2 hours ago</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: 'var(--muted)',
            borderRadius: 'var(--radius)',
          }}>
            <span style={{ color: 'var(--foreground)' }}>Data Entry automation saved 3.5 hours</span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>1 day ago</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: 'var(--muted)',
            borderRadius: 'var(--radius)',
          }}>
            <span style={{ color: 'var(--foreground)' }}>New workflow "Email Automation" activated</span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
} 