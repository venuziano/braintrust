import type { FC } from 'react'
import { BellIcon, ChevronDownIcon, UserIcon } from 'lucide-react'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1 style={{ 
      color: 'var(--foreground)', 
      fontSize: '20px', 
      fontWeight: '600', 
      margin: 0 
    }}>
      {title} Overview
    </h1>
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
      <ChevronDownIcon 
        style={{ 
          width: '16px', 
          height: '16px', 
          color: 'var(--muted-foreground)', 
          cursor: 'pointer' 
        }}
      />
    </div>
  </div>
) 