import './App.css'
import AuthPage from './pages/AuthPage';
import ScrapPage from './pages/ScrapPage';
import Header from './components/molcules/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { USER } from './config';
import UserPage from './pages/UserPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header user={USER} size='large' />
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/main' element={<MainPage />}></Route>
          <Route path='/user' element={<UserPage />}></Route>
          <Route path='/scrap' element={<ScrapPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
