import React from 'react';
import { useSolutionsEngineerProfile } from '../../../api/solutions-engineer';

export function UserProfile() {
  const { data: seProfile, isLoading, error } = useSolutionsEngineerProfile();

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 24px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Loading skeleton for profile section */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Loading skeleton for profile picture */}
          <div style={{
            width: 'clamp(80px, 12vw, 100px)',
            height: 'clamp(80px, 12vw, 100px)',
            borderRadius: '50%',
            backgroundColor: 'var(--skeleton)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }} />
          
          {/* Loading skeleton for user info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1,
          }}>
            <div style={{
              width: '80%',
              height: '20px',
              backgroundColor: 'var(--skeleton)',
              borderRadius: '4px',
              animation: 'pulse 1.5s infinite ease-in-out',
            }} />
            <div style={{
              width: '60%',
              height: '16px',
              backgroundColor: 'var(--skeleton)',
              borderRadius: '4px',
              animation: 'pulse 1.5s infinite ease-in-out',
            }} />
          </div>
        </div>

        {/* Loading skeleton for button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          <div style={{
            width: '100%',
            height: '40px',
            backgroundColor: 'var(--skeleton)',
            borderRadius: 'var(--radius)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }} />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 24px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--destructive)',
      }}>
        <p>Error loading Solutions Engineer profile</p>
        <p style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
          {error.message}
        </p>
      </div>
    );
  }

  // Show no SE assigned state
  if (!seProfile) {
    return (
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(16px, 2vw, 24px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted-foreground)',
      }}>
        <p>No Solutions Engineer assigned</p>
        <p style={{ fontSize: '12px', textAlign: 'center' }}>
          Contact your administrator to assign a Solutions Engineer
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: 'clamp(16px, 2vw, 24px)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--border)',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Profile Picture and User Info Row */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Profile Picture */}
        <div style={{
          width: 'clamp(80px, 12vw, 100px)',
          height: 'clamp(80px, 12vw, 100px)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF6B9D, #4ECDC4, #45B7D1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {/* Placeholder for profile image */}
          <div style={{
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              color: 'white',
              fontWeight: '600',
            }}>
              {getInitials(seProfile.name)}
            </span>
          </div>
        </div>
        
        {/* User Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          flex: 1,
        }}>
          <h3 style={{
            fontSize: 'clamp(18px, 2.5vw, 20px)',
            fontWeight: '700',
            color: 'var(--foreground)',
            margin: 0,
            textAlign: 'center'
          }}>
            {seProfile.name}
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            margin: 0,
            textAlign: 'center'
          }}>
            Solutions Engineer
          </p>
        </div>
      </div>

      {/* Message Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}>
        <button style={{
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          border: 'none',
          borderRadius: 'var(--radius)',
          padding: 'clamp(10px, 1.5vw, 12px) clamp(16px, 2vw, 20px)',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'opacity 0.2s ease',
          width: '100%',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onClick={() => {
          // Open email client with SE's email
          window.open(`mailto:${seProfile.email}`, '_blank');
        }}
        >
          {/* Message Icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Message SE
        </button>
      </div>
    </div>
  );
} 