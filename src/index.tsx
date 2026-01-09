import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app';
import { ToastProvider } from '@/providers/toast-provider';
import AntdProvider from './providers/antd-provider';

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AntdProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AntdProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
