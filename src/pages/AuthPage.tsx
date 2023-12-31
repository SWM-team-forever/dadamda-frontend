import styled from 'styled-components';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { SiReactos } from 'react-icons/si';

function AuthPage() {
    const authTexts = {
        type: "로그인",
        typeDescription: "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
        navigatorDescription: "아직 회원이 아니신가요?",
        navigatorText: "회원가입하기"
    }

    return (
        <Container>
            <AuthFormWrapper>
                <AuthPanel>
                    <AuthPanelHeader>
                        <LogoWrapper>
                            <SiReactos />
                            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>다담다</span>
                        </LogoWrapper>
                        <span style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0" }}>{authTexts.type}</span>
                        <span>{authTexts.typeDescription}</span>
                    </AuthPanelHeader>
                    <AuthPanelButtons>
                        <GoogleLoginButton style={{ width: "fit-content", padding: "0 20px" }} />
                    </AuthPanelButtons>
                </AuthPanel>
            </AuthFormWrapper>
        </Container>
    )
}

const Container = styled.div`
    background-color: ${props => props.theme.color.primary_color};
    width: 100vw;
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

const AuthPanelButtons = styled.div`
    display: flex;
    justify-content: center;
`

export default AuthPage;
