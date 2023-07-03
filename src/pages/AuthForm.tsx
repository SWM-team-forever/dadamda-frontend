import React from 'react'
import styled from 'styled-components'
import { GoogleLoginButton } from 'react-social-login-buttons';
import { SiReactos } from 'react-icons/si'

type AuthFormProps = {
    isLogin: boolean
}

function AuthForm({ isLogin }: AuthFormProps) {


  return (
    <>
        <AuthPanel>
            <AuthPanelTop>
                <LogoWrapper>
                    <SiReactos/>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>다담다</span>
                </LogoWrapper>
                <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0"}}>Login</span>
                <span>로그인이 필요한 서비스 입니다. 로그인 후 이용해주세요</span>
            </AuthPanelTop>

            <AuthPanelButtons>
                <GoogleLoginButton>
                    구글로 로그인하기
                </GoogleLoginButton>
            </AuthPanelButtons>

            <AuthPanelNavigator>
                <span style={{ marginRight: "5px" }}>아직 회원이 아니신가요?</span>
                <span style={{ color: "#0000FF", cursor: "pointer" }}>회원 가입하기</span>
            </AuthPanelNavigator>
        </AuthPanel>
    </>
  )
}

const AuthPanel = styled.div`
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

const AuthPanelTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const AuthPanelButtons = styled.div`

`

const AuthPanelNavigator = styled.div`

`

export default AuthForm
