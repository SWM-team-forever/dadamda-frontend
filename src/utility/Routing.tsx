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
import metaImage from 'public/dadamda_img.png';

function Routing() {
  const location = useLocation();
  useEffect(() => {
    trakPageView();
  })

  function trakPageView() {
    logEvent(`enter_${location.pathname}`);
  }

  function getCurrentUrl() {
    return window.location.href;
  }

  const metaProperties = {
    title: '세상의 모든 URL, 다담다',
    description: '내용에 따라 자동으로 북마크를 구성하는 신개념 컨텐츠 맞춤 스크랩 서비스, 다담다',
    image: metaImage,
    url: getCurrentUrl(),
    siteName: '다담다',
    type: 'website',
  }

  return (
    <>
      <Helmet>
        <title>{metaProperties.title}</title>
        <meta name="description" content={metaProperties.description} />
        <meta property="og:title" content={metaProperties.title} />
        <meta property="og:description" content={metaProperties.description} />
        <meta property="og:image" content={metaProperties.image} />
        <meta property="og:url" content={metaProperties.url} />
        <meta property="og:site_name" content={metaProperties.siteName} />
        <meta property="og:type" content={metaProperties.type} />
        <meta property="twitter:title" content={metaProperties.title} />
        <meta property="twitter:description" content={metaProperties.description} />
        <meta property="twitter:image" content={metaProperties.image} />
        <meta property="twitter:url" content={metaProperties.url} />
      </Helmet>
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
