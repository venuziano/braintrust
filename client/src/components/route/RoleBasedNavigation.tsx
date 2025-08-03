import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRoutesByRole, routesToNavItems, type Route } from '../../routes';

export interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  allowedRoles: string[];
}

export function useNavigationItems() {
  const { user } = useAuth();

  if (!user) {
    return [];
  }

  // Get routes based on user role
  const routes = getRoutesByRole(user.role);
  
  // Convert routes to navigation items
  const navItems = routesToNavItems(routes);

  return navItems;
} 