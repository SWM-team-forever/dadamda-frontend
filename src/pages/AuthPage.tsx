import React from 'react'
import styled from 'styled-components';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { SiReactos } from 'react-icons/si'

type AuthPageProps = {
    isLogin: boolean,
    changeAuthType: () => void,
}

function AuthPage({isLogin, changeAuthType}: AuthPageProps) {

    const authTexts = isLogin ? 
    {
        type: "로그인",
        typeDescription: "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
        buttonText: "구글로 로그인하기",
        navigatorDescription: "아직 회원이 아니신가요?",
        navigatorText: "회원가입하기"
    } :
    {
        type: "회원가입",
        typeDescription: "회원가입하시겠습니까?",
        buttonText: "구글로 회원가입하기",
        navigatorDescription: "이미 회원가입 하셨나요?",
        navigatorText: "로그인하기"
    };

  return (
    <Container>
        <AuthFormWrapper>
        <AuthPanel>
            <AuthPanelTop>
                <LogoWrapper>
                    <SiReactos/>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>다담다</span>
                </LogoWrapper>
                <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0"}}>{ authTexts.type }</span>
                <span>{ authTexts.typeDescription }</span>
            </AuthPanelTop>

            <AuthPanelButtons>
                <GoogleLoginButton>
                    { authTexts.buttonText }
                </GoogleLoginButton>
            </AuthPanelButtons>

            <AuthPanelNavigator>
                <span style={{ marginRight: "5px" }}>{ authTexts.navigatorDescription }</span>
                <span style={{ color: "#0000FF", cursor: "pointer"}} onClick={() => changeAuthType()}>{ authTexts.navigatorText }</span>
            </AuthPanelNavigator>
        </AuthPanel>
        </AuthFormWrapper>
    </Container>
  )
}

const Container = styled.div`
    background-color: #dcdefe;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const AuthFormWrapper = styled.div`
    background-color: white;
    width: 80vw;
    height: 80vh;
`

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

export default AuthPage
