import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import theme from '@/assets/styles/themeMuiStyle';
import { LoginProvider, RequireAuth } from '@/context/LoginContext';
import { useModal } from '@/hooks/useModal';

import ModalWrapper from '@/components/molcules/Modal/ModalWrapper';
import Header from '@/components/molcules/Navigation/Header';
import NotReadyTemplate from '@/components/templates/NotReadyTemplate';
import ScrapTemplate from '@/components/templates/ScrapTemplate';
import BoardPage from '@/pages/BoardPage';
import GoogleOAuthLoginpage from '@/pages/GoogleOAuthLoginPage';
import MainPage from '@/pages/MainPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ScrapPage from '@/pages/ScrapPage';
import TrendingPage from '@/pages/TrendingPage';
import UserPage from '@/pages/UserPage';

const queryClient = new QueryClient();

function App() {
  const { modal } = useModal();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <LoginProvider>
              <BrowserRouter>
                <Header />
                {modal.isOpen && <ModalWrapper />}
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
                    <Route index element={<NotReadyTemplate />} />
                  </Route>
                  <Route path='/trending' element={<TrendingPage />}></Route>
                  <Route path='/google-login' element={<GoogleOAuthLoginpage />}></Route>
                  <Route path='/privacy' element={<PrivacyPolicyPage />}></Route>
                </Routes>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </LoginProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider >
    </>
  )
}

export default App;
