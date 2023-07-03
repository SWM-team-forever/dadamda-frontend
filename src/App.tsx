import { useCallback, useState } from 'react';
import './App.css'
import AuthPage from './pages/AuthPage'

function App() {
  
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthType = useCallback(() => {
    setIsLogin(!isLogin);
    console.log(isLogin);
    console.log(!isLogin);
  }, [isLogin]);

  return (
    <>
      <AuthPage isLogin={isLogin} changeAuthType={changeAuthType}/>
    </>
  )
}

export default App
