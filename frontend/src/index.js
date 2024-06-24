import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from './contexts/AuthContext';
import InjectAxios from "./components/InjectAxios";
import { locale, addLocale } from 'primereact/api';

addLocale('en', {
  accept: 'Yes',
  reject: 'No',
  fileSizeTypes: ['Bytes', 'KB', 'MB', 'GB', 'TB']
});
locale('en');

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: Infinity
    },
  },
});


root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <AppProvider>
        <InjectAxios />
        <App />
      </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);