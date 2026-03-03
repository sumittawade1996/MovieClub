import HomePage from './pages/HomePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Admin Dashboard',
    path: '/SumitAdmin',
    element: <AdminDashboardPage />
  }
];

export default routes;
