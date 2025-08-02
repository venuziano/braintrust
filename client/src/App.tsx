import React, { useState } from 'react'
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  CreditCardIcon,
  RepeatIcon,
  MessageSquare,
  BarChart2,
  AlertCircleIcon,
} from 'lucide-react'
import { Header } from './components/Header';
import { PageContent } from './components/PageContent';

export default function App() {
  const navItems = [
    { key: 'Dashboard', label: 'Dashboard', icon: HomeIcon },
    { key: 'Users', label: 'Users', icon: UsersIcon },
    { key: 'Clients', label: 'Clients', icon: BriefcaseIcon },
    { key: 'Billing', label: 'Billing', icon: CreditCardIcon },
    { key: 'Subscriptions', label: 'Subscriptions', icon: RepeatIcon },
    { key: 'Messaging', label: 'Messaging', icon: MessageSquare },
    { key: 'Reporting', label: 'Reporting', icon: BarChart2 },
    { key: 'Exceptions', label: 'Exceptions', icon: AlertCircleIcon },
  ]

  const [selected, setSelected] = useState(navItems[0].key)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        backgroundColor: '#f9fafb',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Menu Items */}
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: 1,
          width: '100%',
          alignItems: 'center',
          padding: '8px 0',
        }}>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                padding: '8px 16px',
                backgroundColor: selected === item.key ? '#e5e7eb' : 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <item.icon className="w-6 h-6 text-gray-700" />
              <span style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: '#374151',
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header Bar */}
        <div style={{ padding: '16px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
          <Header title={selected} />
        </div>
        {/* Page Content Section */}
        <div style={{ flex: 1, padding: '24px', backgroundColor: '#f3f4f6' }}>
          <PageContent title={selected} />
        </div>
      </main>
    </div>
  )
}