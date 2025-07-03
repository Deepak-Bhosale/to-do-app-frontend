import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { pages } from './helper';
import { constants, routes } from '../config/constant';

const PageRoutes = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(constants.user));
    setUser(storedUser);
    setUserLoaded(true);
  }, [location.pathname]);

  if (!userLoaded) {
    return <LinearProgress />;
  }

  return (
    <Routes>
      {pages.map(({ path, Component, key, isPrivate, roles }) => {
        const isAuthorized = !isPrivate || (user && roles.includes(user.role));

        return (
          <Route
            key={key}
            path={path}
            element={
              <Suspense fallback={<LinearProgress />}>
                {isPrivate ? (
                  user ? (
                    //<PrivateLayout>
                    <Component />
                  ) : (
                    //</PrivateLayout>
                    <Navigate to={routes.LOGIN} replace />
                  )
                ) : (
                  <Component />
                )}
              </Suspense>
            }
          />
        );
      })}

      <Route
        path="*"
        element={<Navigate to={routes.NOT_FOUND_ROUTE || '/'} replace />}
      />
    </Routes>
  );
};

export default PageRoutes;
