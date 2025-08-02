import type { FC } from 'react'
import { BellIcon, UserIcon, Menu } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface HeaderProps {
  title: string
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export const Header: FC<HeaderProps> = ({ title, onMenuClick, showMenuButton = false }) => {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--foreground)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Menu style={{ width: '24px', height: '24px' }} />
          </button>
        )}
        <h1 style={{ 
          color: 'var(--foreground)', 
          fontSize: showMenuButton ? '18px' : '20px', 
          fontWeight: '600', 
          margin: 0 
        }}>
          {title} Overview
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <BellIcon 
          style={{ 
            width: '24px', 
            height: '24px', 
            color: 'var(--muted-foreground)', 
            cursor: 'pointer' 
          }}
        />
        <UserIcon 
          style={{ 
            width: '32px', 
            height: '32px', 
            color: 'var(--muted-foreground)', 
            cursor: 'pointer' 
          }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginLeft: '16px',
          paddingLeft: '16px',
          borderLeft: '1px solid var(--border)',
        }}>
          <span style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
          }}>
            Welcome, {user?.name}
          </span>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 