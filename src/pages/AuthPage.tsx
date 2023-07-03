import React from 'react'
import styled from 'styled-components';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { SiReactos } from 'react-icons/si';
import { Link } from 'react-router-dom';

type AuthPageProps = {
    isLogin: boolean,
}

function AuthPage({isLogin}: AuthPageProps) {

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
            <AuthPanelHeader>
                <LogoWrapper>
                    <SiReactos/>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>다담다</span>
                </LogoWrapper>
                <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0"}}>{ authTexts.type }</span>
                <span>{ authTexts.typeDescription }</span>
            </AuthPanelHeader>

            <AuthPanelButtons>
                <GoogleLoginButton>
                    <ButtonText>{ authTexts.buttonText }</ButtonText>
                </GoogleLoginButton>
            </AuthPanelButtons>

            <AuthPanelNavigator>
                <span style={{ marginRight: "5px" }}>{ authTexts.navigatorDescription }</span>
                <Link to={isLogin? "/register" : "/"}>
                    <span style={{ color: "#0000FF", cursor: "pointer"}}>{ authTexts.navigatorText }</span>
                </Link>
            </AuthPanelNavigator>
        </AuthPanel>
        </AuthFormWrapper>
    </Container>
  )
}

const Container = styled.div`
    background-color: #dcdefe;
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media(max-width: 768px) {
        font-size: .7rem;
        text-align: center;
    }
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

const AuthPanelHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonText = styled.span`
    @media(max-width: 768px) {
        font-size: .6rem;
        font-weight: bold;
    }
`

const AuthPanelButtons = styled.div`
    
`

const AuthPanelNavigator = styled.div`
    display: flex;
    @media(max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

export default AuthPage
