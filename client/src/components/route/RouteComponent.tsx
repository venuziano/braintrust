import React from 'react';
import { AdminDashboard } from '../admin/AdminDashboard';
import { ClientDashboard } from '../client/ClientDashboard';
import { ROIPage } from '../client/ROIPage';
import type { Route } from '../../routes';
import { AdminUsers } from '../admin/AdminUsers';
import { AdminClients } from '../admin/AdminClients';
import { AdminBilling } from '../admin/AdminBilling';
import { AdminSubscriptions } from '../admin/AdminSubscriptions';
import { AdminMessaging } from '../admin/AdminMessaging';
import { AdminReporting } from '../admin/AdminReporting';
import { AdminExceptions } from '../admin/AdminExceptions';

interface RouteComponentProps {
  route: Route;
}

export function RouteComponent({ route }: RouteComponentProps) {
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
    'ClientROI': ROIPage,
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

  return <Component title={route.name} />;
} 