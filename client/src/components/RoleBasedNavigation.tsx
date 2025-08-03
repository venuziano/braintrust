import React from 'react';
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
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  allowedRoles: string[];
}

export function useNavigationItems() {
  const { isAdmin, isClient } = useAuth();

  const allNavItems: NavItem[] = [
    // Admin-only items
    { key: 'Dashboard', label: 'Dashboard', icon: HomeIcon, allowedRoles: ['Admin'] },
    { key: 'Users', label: 'Users', icon: UsersIcon, allowedRoles: ['Admin'] },
    { key: 'Clients', label: 'Clients', icon: BriefcaseIcon, allowedRoles: ['Admin'] },
    { key: 'Billing', label: 'Billing', icon: CreditCardIcon, allowedRoles: ['Admin'] },
    { key: 'Subscriptions', label: 'Subscriptions', icon: RepeatIcon, allowedRoles: ['Admin'] },
    { key: 'Messaging', label: 'Messaging', icon: MessageSquare, allowedRoles: ['Admin'] },
    { key: 'Reporting', label: 'Reporting', icon: BarChart2, allowedRoles: ['Admin'] },
    { key: 'Exceptions', label: 'Exceptions', icon: AlertCircleIcon, allowedRoles: ['Admin'] },
    
    // Client-only items
    { key: 'ClientDashboard', label: 'Dashboard', icon: HomeIcon, allowedRoles: ['Client', 'Solutions Engineer'] },
    { key: 'ROI', label: 'ROI', icon: TrendingUp, allowedRoles: ['Client', 'Solutions Engineer'] },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = allNavItems.filter(item => {
    if (isAdmin) {
      return item.allowedRoles.includes('Admin') || item.allowedRoles.includes('Solutions Engineer');
    }
    if (isClient) {
      return item.allowedRoles.includes('Client');
    }
    return false;
  });

  return filteredNavItems;
} 