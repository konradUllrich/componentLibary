import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from '../common/ThemeProvider';
import { createAppRouter } from './router';
import { getRouterConfig } from './routerConfig';
import './index.css';

// Create router with configuration
const routerConfig = getRouterConfig();
const router = createAppRouter(routerConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
