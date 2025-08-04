import type { NavItem } from '../components/route/RoleBasedNavigation';
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  CreditCardIcon,
  RepeatIcon,
  MessageSquare,
  BarChart2,
  AlertCircleIcon,
  TrendingUp,
  KeyIcon,
} from 'lucide-react';

export interface Route {
  name: string;
  path: string;
  component: string;
  allowedRoles: string[];
  icon?: React.ComponentType<{ style?: React.CSSProperties }>;
}

// Admin routes
export const ADMIN_ROUTES: Route[] = [
  { name: 'Dashboard', path: 'admin/dashboard', component: 'AdminDashboard', allowedRoles: ['Admin'], icon: HomeIcon },
  { name: 'Users', path: 'admin/users', component: 'AdminUsers', allowedRoles: ['Admin'], icon: UsersIcon },
  { name: 'Clients', path: 'admin/clients', component: 'AdminClients', allowedRoles: ['Admin'], icon: BriefcaseIcon },
  { name: 'Billing', path: 'admin/billing', component: 'AdminBilling', allowedRoles: ['Admin'], icon: CreditCardIcon },
  { name: 'Subscriptions', path: 'admin/subscriptions', component: 'AdminSubscriptions', allowedRoles: ['Admin'], icon: RepeatIcon },
  { name: 'Messaging', path: 'admin/messaging', component: 'AdminMessaging', allowedRoles: ['Admin'], icon: MessageSquare },
  { name: 'Reporting', path: 'admin/reporting', component: 'AdminReporting', allowedRoles: ['Admin'], icon: BarChart2 },
  { name: 'Exceptions', path: 'admin/exceptions', component: 'AdminExceptions', allowedRoles: ['Admin'], icon: AlertCircleIcon },
];

// Client routes
export const CLIENT_ROUTES: Route[] = [
  { name: 'Dashboard', path: 'client/dashboard', component: 'ClientDashboard', allowedRoles: ['Client', 'Solutions Engineer'], icon: HomeIcon },
  { name: 'ROI', path: 'client/roi', component: 'ClientROI', allowedRoles: ['Client', 'Solutions Engineer'], icon: TrendingUp },
  { name: 'Reporting', path: 'client/reporting', component: 'ClientReporting', allowedRoles: ['Client', 'Solutions Engineer'], icon: BarChart2 },
  { name: 'Credentials', path: 'client/credentials', component: 'ClientCredentials', allowedRoles: ['Client', 'Solutions Engineer'], icon: KeyIcon },
  { name: 'Exceptions', path: 'client/exceptions', component: 'ClientExceptions', allowedRoles: ['Client', 'Solutions Engineer'], icon: AlertCircleIcon },
  { name: 'Users', path: 'client/users', component: 'ClientUsers', allowedRoles: ['Client', 'Solutions Engineer'], icon: UsersIcon },
  { name: 'Billing', path: 'client/billing', component: 'ClientBilling', allowedRoles: ['Client', 'Solutions Engineer'], icon: CreditCardIcon },
  { name: 'Messaging', path: 'client/messaging', component: 'ClientMessaging', allowedRoles: ['Client', 'Solutions Engineer'], icon: MessageSquare },
];

// All routes combined
export const ALL_ROUTES = [...ADMIN_ROUTES, ...CLIENT_ROUTES];

// Route utilities
export function getRoutesByRole(role: string): Route[] {
  if (role === 'Admin') {
    return ADMIN_ROUTES;
  }
  if (role === 'Client' || role === 'Solutions Engineer') {
    return CLIENT_ROUTES;
  }
  return [];
}

export function getRouteByPath(path: string): Route | undefined {
  return ALL_ROUTES.find(route => route.path === path);
}

export function getRouteByName(name: string): Route | undefined {
  return ALL_ROUTES.find(route => route.name === name);
}

export function getDefaultRoute(role: string): Route | undefined {
  const routes = getRoutesByRole(role);
  return routes[0];
}

// Convert routes to NavItems for navigation
export function routesToNavItems(routes: Route[]): NavItem[] {
  return routes.map(route => ({
    key: route.path,
    label: route.name,
    icon: route.icon || (() => null),
    allowedRoles: route.allowedRoles,
  }));
} 