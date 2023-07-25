import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import ScrapPage from './pages/ScrapPage';
import Header from './components/molcules/Header';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import { RequireAuth, UserProvider } from './context/UserContext';
import TrendingPage from './pages/TrendingPage';
import BoardPage from './pages/BoardPage';
import OtherTemplate from './components/templates/OtherTemplate';
import ListTemplate from './components/templates/ListTemplate';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/main' element={<MainPage />}></Route>
            <Route path='/user' element={<RequireAuth><UserPage /></RequireAuth>}></Route>
            <Route path='/scrap' element={<RequireAuth><ScrapPage /></RequireAuth>}>
              <Route path='list' element={<ListTemplate />}></Route>
              <Route path='article' element={<OtherTemplate />}></Route>
              <Route path='product' element={<OtherTemplate />}></Route>
              <Route path='video' element={<OtherTemplate />}></Route>
              <Route path='location' element={<OtherTemplate />}></Route>
              <Route path='other' element={<OtherTemplate />}></Route>
              <Route path='' element={<ListTemplate />}></Route>
            </Route>
            <Route path='/board' element={<RequireAuth><BoardPage /></RequireAuth>}></Route>
            <Route path='/trending' element={<TrendingPage />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;
