import type { FC } from 'react'
import { BellIcon, ChevronDownIcon, UserIcon } from 'lucide-react'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1 style={{ color: '#111827', fontSize: '20px', fontWeight: 600, margin: 0 }}>
      {title} Overview
    </h1>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" style={{ cursor: 'pointer' }}/>
      <UserIcon className="w-8 h-8 text-gray-600 cursor-pointer" style={{ cursor: 'pointer' }}/>
      <ChevronDownIcon className="w-4 h-4 text-gray-600 cursor-pointer" style={{ cursor: 'pointer' }}/>
    </div>
  </div>
) 