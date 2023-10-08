import * as Sentry from '@sentry/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { Routes, Route, useLocation, createRoutesFromChildren, matchRoutes, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

import theme from '@/assets/styles/themeMuiStyle';
import { LoginProvider, RequireAuth } from '@/context/LoginContext';
import { useModal } from '@/hooks/useModal';
import { SENTRY_DSN } from '@/secret';

import ModalWrapper from '@/components/molcules/Modal/ModalWrapper';
import Header from '@/components/molcules/Navigation/Header';
import ErrorPage from '@/pages/ErrorPage';
import RouteChangeTracker from '@/utility/RouteChangeTracker';
import { initAmplitude } from '@/utility/amplitude';
import { logEvent } from '@amplitude/analytics-browser';
import Routing from '@/utility/Routing';
import RightSideModalWrapper from '@/components/molcules/Modal/RightSideModalWrapper';

const queryClient = new QueryClient();
Sentry.init({
  dsn: process.env.NODE_ENV === "production" ? SENTRY_DSN : "",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/dadamda\.me\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

initAmplitude();

function App() {
  const { modal } = useModal();
  RouteChangeTracker();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <LoginProvider>
            <Header />
            {modal.isOpen && (
              modal.position === 'center' ? <ModalWrapper /> : <RightSideModalWrapper />
            )}
            <ErrorBoundary
              FallbackComponent={ErrorPage}
              onReset={() => {
                window.location.reload();
              }}
            >
              <Routing />
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </LoginProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider >
  )
}

export default App;
