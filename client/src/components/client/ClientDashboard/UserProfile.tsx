import React from 'react';

export function UserProfile() {
  return (
    <div style={{
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      padding: 'clamp(16px, 2vw, 24px)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--border)',
      height: 'fit-content',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        textAlign: 'center',
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
              JS
            </span>
          </div>
        </div>
        
        {/* User Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <h3 style={{
            fontSize: 'clamp(18px, 2.5vw, 20px)',
            fontWeight: '700',
            color: 'var(--foreground)',
            margin: 0,
          }}>
            John Smith
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            margin: 0,
          }}>
            Solutions Engineer
          </p>
        </div>
        
        {/* Message Button */}
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
          minWidth: '140px',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
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