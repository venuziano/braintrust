import React from 'react';
import { TrendingUp, DollarSign, Calendar, BarChart3 } from 'lucide-react';

interface ROIPageProps {
  title: string;
}

export function ROIPage({ title }: ROIPageProps) {
  // Mock ROI data
  const roiData = {
    totalInvestment: 25000,
    totalSavings: 18420,
    totalROI: 245.8,
    monthlyROI: 18.5,
    timeToROI: 3.2,
    workflows: [
      { name: 'Invoice Processing', roi: 320, savings: 8500, timeSaved: 45 },
      { name: 'Data Entry Automation', roi: 280, savings: 6200, timeSaved: 38 },
      { name: 'Email Campaigns', roi: 195, savings: 3720, timeSaved: 22 },
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
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
          Return on Investment Analysis
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--muted-foreground)',
          margin: 0,
        }}>
          Detailed breakdown of your automation investment returns
        </p>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'var(--chart-2)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}>
            <TrendingUp style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '4px',
          }}>
            {roiData.totalROI}%
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
          }}>
            Total ROI
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'var(--chart-3)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}>
            <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '4px',
          }}>
            ${roiData.totalSavings.toLocaleString()}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
          }}>
            Total Savings
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'var(--chart-4)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}>
            <Calendar style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '4px',
          }}>
            {roiData.timeToROI}mo
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
          }}>
            Time to ROI
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'var(--chart-5)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
          }}>
            <BarChart3 style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '4px',
          }}>
            {roiData.monthlyROI}%
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
          }}>
            Monthly ROI
          </div>
        </div>
      </div>

      {/* Investment vs Savings */}
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
          margin: '0 0 20px 0',
        }}>
          Investment vs Savings
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: '0 0 12px 0',
            }}>
              Total Investment
            </h3>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--destructive)',
              marginBottom: '8px',
            }}>
              ${roiData.totalInvestment.toLocaleString()}
            </div>
            <p style={{
              fontSize: '14px',
              color: 'var(--muted-foreground)',
              margin: 0,
            }}>
              Initial automation setup and ongoing costs
            </p>
          </div>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              margin: '0 0 12px 0',
            }}>
              Total Savings
            </h3>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--chart-2)',
              marginBottom: '8px',
            }}>
              ${roiData.totalSavings.toLocaleString()}
            </div>
            <p style={{
              fontSize: '14px',
              color: 'var(--muted-foreground)',
              margin: 0,
            }}>
              Cumulative savings from automation
            </p>
          </div>
        </div>
      </div>

      {/* Workflow ROI Breakdown */}
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
          margin: '0 0 20px 0',
        }}>
          Workflow ROI Breakdown
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {roiData.workflows.map((workflow, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--foreground)',
                  marginBottom: '4px',
                }}>
                  {workflow.name}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--chart-2)',
                }}>
                  {workflow.roi}%
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--muted-foreground)',
                }}>
                  ROI
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--foreground)',
                }}>
                  ${workflow.savings.toLocaleString()}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--muted-foreground)',
                }}>
                  Savings
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--foreground)',
                }}>
                  {workflow.timeSaved}h
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--muted-foreground)',
                }}>
                  Time Saved
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 