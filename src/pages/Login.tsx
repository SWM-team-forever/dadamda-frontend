import React from 'react'
import styled from 'styled-components'
import { GoogleLoginButton } from 'react-social-login-buttons';
import { SiReactos } from 'react-icons/si'

function Login() {
  return (
    <>
        <LoginPanel>
            <LoginPanelTop>
                <LogoWrapper>
                    <SiReactos/>
                    <span>다담다</span>
                </LogoWrapper>
                <span>Login</span>
                <span>로그인이 필요한 서비스 입니다. 로그인 후 이용해주세요</span>
            </LoginPanelTop>

            <LoginPanelButtons>
                <GoogleLoginButton>
                    구글로 로그인하기
                </GoogleLoginButton>
            </LoginPanelButtons>

            <LoginPanelNavigator>
                <span>아직 회원이 아니신가요?</span>
            </LoginPanelNavigator>
        </LoginPanel>
        
    </>
  )
}

const LoginPanel = styled.div`
    padding: 50px;
`
const LogoWrapper = styled.div`
    display: flex;
`

const LoginPanelTop = styled.div`
    
`
const LoginPanelButtons = styled.div`

`

const LoginPanelNavigator = styled.div`

`

export default Login;
