import * as Sentry from '@sentry/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { useLocation, createRoutesFromChildren, matchRoutes, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

import theme from '@/assets/styles/themeMuiStyle';
import { LoginProvider } from '@/context/LoginContext';
import { useModal } from '@/hooks/useModal';
import { SENTRY_DSN } from '@/secret';
import RouteChangeTracker from '@/utility/RouteChangeTracker';
import { initAmplitude } from '@/utility/amplitude';
import Routing from '@/utility/Routing';

import ModalWrapper from '@/components/molcules/Modal/ModalWrapper';
import Header from '@/components/molcules/Navigation/Header';
import RightSideModalWrapper from '@/components/molcules/Modal/RightSideModalWrapper';
import ErrorPage from '@/pages/ErrorPage';
import FullScreenModalWrapper from '@/components/molcules/Modal/FullScreenModalWrapper';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });

  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register('service-worker.js');

    // After the initial load, force a service worker update check each time
    // our web app is hidden and then brought back to the foreground.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        registration.update();
      }
    });

  });
}

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

  const modalWrapperMatching = {
    center: <ModalWrapper />,
    right: <RightSideModalWrapper />,
    full: <FullScreenModalWrapper />,
  }

  const getModalWrapper = () => {
    return modalWrapperMatching[modal.position as keyof typeof modalWrapperMatching];
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1}>
          <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={() => {
              window.location.reload();
            }}
          >
            <LoginProvider>
              <Header />
              {modal.isOpen && getModalWrapper()}
              <Routing />
              <ReactQueryDevtools initialIsOpen={false} />
            </LoginProvider>
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider >
  )
}

export default App;
