import { useCallback, useState } from 'react';
import './App.css'
import AuthPage from './pages/AuthPage'
import CardViewPage from './pages/CardViewPage';

function App() {
  
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthType = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  return (
    <>
      <AuthPage isLogin={isLogin} changeAuthType={changeAuthType}/>
      <CardViewPage/>
    </>
  )
}

export default App
