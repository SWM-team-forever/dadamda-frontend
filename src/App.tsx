import './App.css'
import { GoogleLoginButton } from 'react-social-login-buttons'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
  return (
    <>
      
      <GoogleLoginButton>
        구글로 로그인하기
      </GoogleLoginButton>
      <GoogleLoginButton>
        구글로 회원가입하기
      </GoogleLoginButton>

      <Login/>
      <SignUp/>
    </>
  )
}

export default App
