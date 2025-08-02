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
import { Header } from './components/Header'
import { PageContent } from './components/PageContent'

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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          backgroundColor: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* Menu Items */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            padding: '8px 0',
          }}
        >
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: selected === item.key ? '12px 16px' : '8px 16px',
                margin: selected === item.key ? '12px 16px' : '8px 16px',
                borderRadius: 'var(--radius)',
                backgroundColor:
                  selected === item.key
                    ? 'var(--muted)'
                    : 'transparent',
                color:
                  selected === item.key
                    ? 'var(--foreground)'
                    : 'var(--sidebar-foreground)',
                border: 'none',
                cursor: 'pointer',
                gap: '12px',
              }}
            >
              <item.icon className="w-6 h-6" />
              <span style={{ fontSize: '14px' }}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--background)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Header title={selected} />
        </div>

        {/* Page Content Section */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            backgroundColor: 'var(--sidebar)',
            color: 'var(--sidebar-foreground)',
          }}
        >
          <PageContent title={selected} />
        </div>
      </main>
    </div>
  )
}