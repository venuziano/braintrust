import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getRoutesByRole, 
  getRouteByPath, 
  getDefaultRoute, 
  routesToNavItems,
  type Route 
} from '../routes';

export function useRoutes() {
  const { user, isAdmin, isClient, isLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [navItems, setNavItems] = useState<any[]>([]);

  // Get current path from URL
  const getCurrentPath = () => {
    return window.location.pathname.slice(1); // Remove leading slash
  };

  // Update URL without page reload
  const updateURL = (path: string) => {
    const newPath = path ? `/${path}` : '/';
    window.history.pushState({ path }, '', newPath);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = getCurrentPath();
      if (path) {
        const route = getRouteByPath(path);
        if (route) {
          setCurrentRoute(route);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize route from URL or set default
  useEffect(() => {
    // Don't initialize routes while still loading authentication state
    if (isLoading) {
      return;
    }

    if (user) {
      const routes = getRoutesByRole(user.role);
      const navItemsFromRoutes = routesToNavItems(routes);
      setNavItems(navItemsFromRoutes);

      // Check if current URL matches a valid route
      const currentPath = getCurrentPath();
      let route: Route | null = null;

      if (currentPath) {
        const foundRoute = getRouteByPath(currentPath);
        if (foundRoute) {
          route = foundRoute;
        }
      }

      // If no valid route in URL, set default route
      if (!route) {
        const defaultRoute = getDefaultRoute(user.role);
        if (defaultRoute) {
          route = defaultRoute;
          updateURL(defaultRoute.path);
        }
      }

      setCurrentRoute(route);
    }
  }, [user, isLoading]);

  // Navigation functions
  const navigateTo = (path: string) => {
    const route = getRouteByPath(path);
    if (route) {
      setCurrentRoute(route);
      updateURL(path);
    }
  };

  const navigateToName = (name: string) => {
    const route = navItems.find(item => item.label === name);
    if (route) {
      const foundRoute = getRouteByPath(route.key);
      if (foundRoute) {
        setCurrentRoute(foundRoute);
        updateURL(route.key);
      }
    }
  };

  const getCurrentRoute = () => currentRoute;

  const getNavItems = () => navItems;

  const isCurrentRoute = (path: string) => currentRoute?.path === path;

  return {
    currentRoute,
    navItems,
    navigateTo,
    navigateToName,
    getCurrentRoute,
    getNavItems,
    isCurrentRoute,
  };
} 