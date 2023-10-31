import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ScrapTemplate from '@/components/templates/ScrapTemplate';
import BoardListTemplate from '@/components/templates/BoardListTemplate';
import BoardPage from '@/pages/BoardPage';
import OAuthLoginpage from '@/pages/OAuthLoginPage';
import MainPage from '@/pages/MainPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ScrapPage from '@/pages/ScrapPage';
import TrendingPage from '@/pages/TrendingPage';
import UserPage from '@/pages/UserPage';
import NotFoundPage from '@/pages/NotFoundPage';
import BoardContentsWrapperPage from '@/pages/BoardContentsWrapperPage';

import { RequireAuth } from '@/context/LoginContext';
import { logEvent } from '@/utility/amplitude';

function Routing() {
  const location = useLocation();
  useEffect(() => {
    trakPageView();
  })

  function trakPageView() {
    logEvent(`enter_${location.pathname}`);
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<RequireAuth><ScrapPage /></RequireAuth>}>
          <Route index element={<ScrapTemplate type={'list'} />}></Route>
        </Route>
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
        <Route path='/board-contents/:boardUUID' element={<BoardContentsWrapperPage />}></Route>
        <Route path='/not-found' element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default Routing;
