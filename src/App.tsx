import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import ScrapPage from './pages/ScrapPage';
import Header from './components/molcules/Header';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import { RequireAuth, UserProvider } from './context/UserContext';
import TrendingPage from './pages/TrendingPage';
import BoardPage from './pages/BoardPage';
import ScrapTemplate from './components/templates/ScrapTemplate';

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
            <Route path='/scrap' element={<RequireAuth><ScrapTemplate /></RequireAuth>}></Route>
            <Route path='/board' element={<RequireAuth><BoardPage /></RequireAuth>}></Route>
            <Route path='/trending' element={<TrendingPage />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;
