import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getRouteByPath, getDefaultRoute } from '../routes';

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    // Don't do any routing logic while still loading authentication state
    if (isLoading) {
      return;
    }

    if (isAuthenticated && user) {
      const currentPath = window.location.pathname.slice(1);
      
      // If on root path, redirect to default route
      if (currentPath === '') {
        const defaultRoute = getDefaultRoute(user.role);
        if (defaultRoute) {
          window.history.pushState({}, '', `/${defaultRoute.path}`);
          return;
        }
      }

      // Check if current path is valid for user role
      const route = getRouteByPath(currentPath);
      if (!route) {
        // Invalid route, redirect to default
        const defaultRoute = getDefaultRoute(user.role);
        if (defaultRoute) {
          window.history.pushState({}, '', `/${defaultRoute.path}`);
          return;
        }
      }

      // Check if user has access to this route
      if (route && !route.allowedRoles.includes(user.role)) {
        // Unauthorized route, redirect to default
        const defaultRoute = getDefaultRoute(user.role);
        if (defaultRoute) {
          window.history.pushState({}, '', `/${defaultRoute.path}`);
          return;
        }
      }
    }
  }, [isAuthenticated, user, isLoading]);

  return <>{children}</>;
} 