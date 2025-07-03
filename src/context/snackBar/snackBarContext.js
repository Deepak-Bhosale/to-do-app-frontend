import React, { createContext, useContext } from 'react';

export const SnackbarContext = createContext('');

export const useSnackbar = () => useContext(SnackbarContext);
