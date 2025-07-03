// export const handleOnTableDataSort = (value, order) => (a, b) => {
//   if (order === "asc") {
//     if (a[value] > b[value]) return 1;
//     if (a[value] < b[value]) return -1;
//   } else {
//     if (a[value] < b[value]) return 1;
//     if (a[value] > b[value]) return -1;
//   }
//   return 0;
// };

export const routes = {
  // ADMIN_DASHBOARD: "/admin-dashboard",
  // ADMIN_USER_MANAGEMENT: "/admin-dashboard/user-management",
  USER_DASHBOARD: '/dashboard',
  // PROFILE: "/profile",
  // SUPPORT: "/support",
  // ACCOUNT_SETTINGS: "/account-settings",
  LOGIN: '/',
  REGISTER_USER: '/register-user',
  NOT_FOUND_ROUTE: '/*',
};

// export const adminPages = [
//   {
//     page: "DASHBOARD",
//     url: routes.ADMIN_DASHBOARD,
//   },
//   {
//     page: "USER MANAGEMENT",
//     url: routes.ADMIN_USER_MANAGEMENT,
//   },
// ];

export const userPages = [
  {
    page: 'DASHBOARD',
    url: routes.USER_DASHBOARD,
  },
];

export const constants = {
  admin: 'admin',
  user: 'user',
  general: 'general',
  success: 'success',
  error: 'error',
  accessToken: 'accessToken',
  darkMode: 'darkMode',
  dark: 'dark',
  light: 'light',
};

export const colors = {
  primaryMain: '#2788D1',
  secondaryMain: '#000000',
  textDark: '#FFFFFF',
  textLight: '#000000',
  backgroundDarkDefault: '#101418',
  backgroundLightDefault: '#F1F1F4',
  backgroundDarkPaper: '#1E1E1E',
  backgroundLightPaper: '#FFFFFF',
  darkSecondaryBackgroundColor: '#1A2027',
  dividerDark: '#2c2c2c',
  dividerLight: '#e0e0e0',
};
