import { useCallback, useState } from 'react';
import './App.css'
import AuthPage from './pages/AuthPage';
import CardViewPage from './pages/CardViewPage';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthType = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<AuthPage isLogin={true}/>}></Route>
          <Route path='/register' element={<AuthPage isLogin={false}/>}></Route>
          <Route path='/cards' element={<CardViewPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
