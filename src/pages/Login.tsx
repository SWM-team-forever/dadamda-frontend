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
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>다담다</span>
                </LogoWrapper>
                <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0"}}>Login</span>
                <span>로그인이 필요한 서비스 입니다. 로그인 후 이용해주세요</span>
            </LoginPanelTop>

            <LoginPanelButtons>
                <GoogleLoginButton>
                    구글로 로그인하기
                </GoogleLoginButton>
            </LoginPanelButtons>

            <LoginPanelNavigator>
                <span style={{ marginRight: "5px" }}>아직 회원이 아니신가요?</span>
                <span style={{ color: "#0000FF", cursor: "pointer" }}>회원 가입하기</span>
            </LoginPanelNavigator>
        </LoginPanel>
        
    </>
  )
}

const LoginPanel = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const LoginPanelTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LoginPanelButtons = styled.div`

`

const LoginPanelNavigator = styled.div`

`

export default Login;
