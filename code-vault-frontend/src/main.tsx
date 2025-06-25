import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import {createRouter} from './router'
import './themes/index.css'; 
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()
const router = createRouter(queryClient)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders client={queryClient}>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);