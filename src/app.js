import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ErrorBoundary } from './components';
import { CssBaseline, Typography } from '@mui/material';
import { PageRoutes } from './routes';
import { client } from './apolloClient';
import { SnackBarProvider } from './context';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        {/* <ThemeProviderWrapper> */}
        <SnackBarProvider>
          <Typography>
            <CssBaseline />
            <BrowserRouter>
              <PageRoutes />
            </BrowserRouter>
          </Typography>
        </SnackBarProvider>
        {/* </ThemeProviderWrapper> */}
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
