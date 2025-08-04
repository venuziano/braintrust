import React, { Suspense } from 'react';
import type { Route } from '../../routes';

// Lazy load all admin components
const AdminDashboard = React.lazy(() => import('../admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminUsers = React.lazy(() => import('../admin/AdminUsers').then(module => ({ default: module.AdminUsers })));
const AdminClients = React.lazy(() => import('../admin/AdminClients').then(module => ({ default: module.AdminClients })));
const AdminBilling = React.lazy(() => import('../admin/AdminBilling').then(module => ({ default: module.AdminBilling })));
const AdminSubscriptions = React.lazy(() => import('../admin/AdminSubscriptions').then(module => ({ default: module.AdminSubscriptions })));
const AdminMessaging = React.lazy(() => import('../admin/AdminMessaging').then(module => ({ default: module.AdminMessaging })));
const AdminReporting = React.lazy(() => import('../admin/AdminReporting').then(module => ({ default: module.AdminReporting })));
const AdminExceptions = React.lazy(() => import('../admin/AdminExceptions').then(module => ({ default: module.AdminExceptions })));

// Lazy load all client components
const ClientDashboard = React.lazy(() => import('../client/ClientDashboard/LazyClientDashboard').then(module => ({ default: module.LazyClientDashboard })));
const ClientROI = React.lazy(() => import('../client/ClientROI').then(module => ({ default: module.ClientROI })));
const ClientBilling = React.lazy(() => import('../client/ClientBilling').then(module => ({ default: module.ClientBilling })));
const ClientCredentials = React.lazy(() => import('../client/ClientCredentials').then(module => ({ default: module.ClientCredentials })));
const ClientExceptions = React.lazy(() => import('../client/ClientExceptions').then(module => ({ default: module.ClientExceptions })));
const ClientMessaging = React.lazy(() => import('../client/ClientMessaging').then(module => ({ default: module.ClientMessaging })));
const ClientReporting = React.lazy(() => import('../client/ClientReporting').then(module => ({ default: module.ClientReporting })));
const ClientUsers = React.lazy(() => import('../client/ClientUsers').then(module => ({ default: module.ClientUsers })));

// Loading fallback component
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '16px',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid var(--border)',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p style={{
        fontSize: '16px',
        color: 'var(--muted-foreground)',
        margin: 0,
      }}>
        Loading page...
      </p>
    </div>
  );
}

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Route component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          padding: '24px',
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--foreground)',
            margin: '0 0 16px 0',
          }}>
            Something went wrong
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--muted-foreground)',
            margin: '0 0 16px 0',
          }}>
            Failed to load the page. Please try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              borderRadius: 'var(--radius)',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface LazyRouteComponentProps {
  route: Route;
}

export function LazyRouteComponent({ route }: LazyRouteComponentProps) {
  const componentMap: Record<string, React.ComponentType<{ title: string }>> = {
    // Admin components
    'AdminDashboard': AdminDashboard,
    'AdminUsers': AdminUsers,
    'AdminClients': AdminClients,
    'AdminBilling': AdminBilling,
    'AdminSubscriptions': AdminSubscriptions,
    'AdminMessaging': AdminMessaging,
    'AdminReporting': AdminReporting,
    'AdminExceptions': AdminExceptions,
    
    // Client components
    'ClientDashboard': ClientDashboard,
    'ClientROI': ClientROI,
    'ClientBilling': ClientBilling,
    'ClientCredentials': ClientCredentials,
    'ClientExceptions': ClientExceptions,
    'ClientMessaging': ClientMessaging,
    'ClientReporting': ClientReporting,
    'ClientUsers': ClientUsers,
  };

  const Component = componentMap[route.component];

  if (!Component) {
    return (
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
          The requested page "{route.name}" is not available.
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Component title={route.name} />
      </Suspense>
    </ErrorBoundary>
  );
} 