import './App.css'
import ScrapPage from './pages/ScrapPage';
import Header from './components/molcules/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RequireAuth, UserProvider } from './context/UserContext';
import TrendingPage from './pages/TrendingPage';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <>
      <UserProvider>
        <GoogleOAuthProvider clientId='1068894831951-1dhm7g6ic955q77gmlfs5k5r774d57hd.apps.googleusercontent.com'>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<MainPage />}></Route>
              <Route path='/main' element={<MainPage />}></Route>
              <Route path='/user' element={<RequireAuth><UserPage /></RequireAuth>}></Route>
              <Route path='/scrap' element={<RequireAuth><ScrapPage /></RequireAuth>}></Route>
              <Route path='/board' element={<RequireAuth><BoardPage /></RequireAuth>}></Route>
              <Route path='/trending' element={<RequireAuth><TrendingPage /></RequireAuth>}></Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider >
      </UserProvider>
    </>
  )
}

export default App;
