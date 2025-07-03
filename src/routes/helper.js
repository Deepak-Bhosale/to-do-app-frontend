import { lazy } from 'react';
import { constants, routes } from '../config/constant';

const Login = lazy(() => import('../pages/login/login'));
const RegisterUser = lazy(() => import('../pages/registerUser/registerUser'));
const UserDashboard = lazy(() => import('../pages/dashboard/dashboard'));
const NotFoundRoute = lazy(() =>
  import('../pages/notFoundRoute/notFoundRoute')
);

export const pages = [
  {
    path: routes.LOGIN,
    Component: Login,
    isPrivate: false,
    key: 1,
  },
  {
    path: routes.REGISTER_USER,
    Component: RegisterUser,
    isPrivate: false,
    key: 2,
  },
  {
    path: routes.USER_DASHBOARD,
    Component: UserDashboard,
    isPrivate: true,
    roles: [constants.general],
    key: 3,
  },
  {
    path: routes.NOT_FOUND_ROUTE,
    Component: NotFoundRoute,
    isPrivate: true,
    roles: [constants.general],
    key: 4,
  },
];
