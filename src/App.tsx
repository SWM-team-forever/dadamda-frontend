import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route, useLocation, createRoutesFromChildren, matchRoutes, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

import theme from '@/assets/styles/themeMuiStyle';
import { LoginProvider, RequireAuth } from '@/context/LoginContext';
import { useModal } from '@/hooks/useModal';

import ModalWrapper from '@/components/molcules/Modal/ModalWrapper';
import Header from '@/components/molcules/Navigation/Header';
import ScrapTemplate from '@/components/templates/ScrapTemplate';
import BoardPage from '@/pages/BoardPage';
import OAuthLoginpage from '@/pages/OAuthLoginPage';
import MainPage from '@/pages/MainPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ScrapPage from '@/pages/ScrapPage';
import TrendingPage from '@/pages/TrendingPage';
import UserPage from '@/pages/UserPage';
import ErrorPage from '@/pages/ErrorPage';

import * as Sentry from '@sentry/react';
import React from 'react';
import { SENTRY_DSN } from '@/secret';
import BoardListTemplate from '@/components/templates/BoardListTemplate';
import RouteChangeTracker from '@/utility/RouteChangeTracker';

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

RouteChangeTracker();

function App() {
  const { modal } = useModal();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <LoginProvider>
            <BrowserRouter>
              <Header />
              {modal.isOpen && <ModalWrapper />}
              <ErrorBoundary
                FallbackComponent={ErrorPage}
                onReset={() => {
                  window.location.reload();
                }}
              >
                <Routes>
                  <Route path='/' element={<MainPage />}></Route>
                  <Route path='/main' element={<MainPage />}></Route>
                  <Route path='/user' element={<RequireAuth><UserPage /></RequireAuth>}></Route>
                  <Route path='/scrap' element={<RequireAuth><ScrapPage /></RequireAuth>}>
                    <Route path='list' element={<ScrapTemplate type={'list'} />}></Route>
                    <Route path='article' element={<ScrapTemplate type={'article'} />}></Route>
                    <Route path='product' element={<ScrapTemplate type={'product'} />}></Route>
                    <Route path='video' element={<ScrapTemplate type={'video'} />}></Route>
                    <Route path='location' element={<ScrapTemplate type={'location'} />}></Route>
                    <Route path='other' element={<ScrapTemplate type={'other'} />}></Route>
                    <Route index element={<ScrapTemplate type={'list'} />}></Route>
                  </Route>
                  <Route path='/board' element={<RequireAuth><BoardPage /></RequireAuth>}>
                    <Route index element={<BoardListTemplate />} />
                  </Route>
                  <Route path='/trending' element={<TrendingPage />}></Route>
                  <Route path='/oauth-login' element={<OAuthLoginpage />}></Route>
                  <Route path='/privacy' element={<PrivacyPolicyPage />}></Route>
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </LoginProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider >
  )
}

export default App;
