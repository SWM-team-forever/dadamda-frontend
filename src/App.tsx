import './App.css'
import AuthPage from './pages/AuthPage';
import ScrapPage from './pages/ScrapPage';
import Header from './components/molcules/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { USER } from './config';
import UserPage from './pages/UserPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { createContext } from 'react';
import { UserContext, UserProvider } from './context/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <GoogleOAuthProvider clientId='1068894831951-1dhm7g6ic955q77gmlfs5k5r774d57hd.apps.googleusercontent.com'>
          <BrowserRouter>
            <Header user={null} size='large' />
            <Routes>
              <Route path='/' element={<MainPage />}></Route>
              <Route path='/main' element={<MainPage />}></Route>
              <Route path='/user' element={<UserPage />}></Route>
              <Route path='/scrap' element={<ScrapPage />}></Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider >
      </UserProvider>
    </>
  )
}

export default App;
