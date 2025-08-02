import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Header } from './components/Header'
import { RouteComponent } from './components/RouteComponent'
import { RouteGuard } from './components/RouteGuard'
import { LoginPage } from './components/LoginPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useRoutes } from './hooks/useRoutes'

function AppContent() {
  const { currentRoute, navItems, navigateTo, isCurrentRoute } = useRoutes()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--background)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid var(--border)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <span style={{
            fontSize: '16px',
            color: 'var(--muted-foreground)',
          }}>
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <RouteGuard>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          position: 'relative',
        }}
      >
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: isMobile ? '280px' : isTablet ? '200px' : '240px',
          backgroundColor: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)',
          display: 'flex',
          flexDirection: 'column',
          position: isMobile ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 50,
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid var(--sidebar-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--sidebar-foreground)',
              margin: 0,
            }}>
              Menu
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--sidebar-foreground)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: 'var(--radius)',
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        )}

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
              onClick={() => {
                navigateTo(item.key);
                if (isMobile) {
                  setSidebarOpen(false);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isCurrentRoute(item.key) ? '12px 16px' : '8px 16px',
                margin: isCurrentRoute(item.key) ? '12px 16px' : '8px 16px',
                borderRadius: 'var(--radius)',
                backgroundColor:
                  isCurrentRoute(item.key)
                    ? 'var(--sidebar-accent)'
                    : 'transparent',
                color:
                  isCurrentRoute(item.key)
                    ? 'var(--sidebar-accent-foreground)'
                    : 'var(--sidebar-foreground)',
                border: 'none',
                cursor: 'pointer',
                gap: '12px',
                transition: 'all 0.2s ease',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                if (!isCurrentRoute(item.key)) {
                  e.currentTarget.style.backgroundColor = 'var(--sidebar-accent)';
                  e.currentTarget.style.color = 'var(--sidebar-accent-foreground)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCurrentRoute(item.key)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--sidebar-foreground)';
                }
              }}
            >
              <item.icon style={{ width: '24px', height: '24px' }} />
              <span>{item.label}</span>
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
          marginLeft: isMobile ? 0 : undefined,
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: isMobile ? '12px 16px' : '16px 24px',
            backgroundColor: 'var(--background)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Header 
            title={currentRoute?.name || 'Dashboard'} 
            onMenuClick={() => setSidebarOpen(true)}
            showMenuButton={isMobile}
          />
        </div>

        {/* Page Content Section */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? '16px' : '24px',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            overflow: 'auto',
          }}
        >
          {/* Route Component Rendering */}
          {currentRoute ? (
            <RouteComponent route={currentRoute} />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--foreground)',
                margin: '0 0 16px 0',
              }}>
                Page Not Found
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'var(--muted-foreground)',
                margin: 0,
              }}>
                The requested page is not available.
              </p>
            </div>
          )}
        </div>
      </main>
      </div>
    </RouteGuard>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}