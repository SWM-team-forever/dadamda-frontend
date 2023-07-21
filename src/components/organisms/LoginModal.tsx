import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import CrossIcon from '../../assets/icons/CrossIcon.png';
import logo from '../../assets/images/dadamda-logo128.png';
import { useGoogleLogin } from '@react-oauth/google';

function LoginModal(hideLoginModal) {
    const googleSocialLogin = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <ModalContainer>
            <CrossIconContainer>
                <img src={CrossIcon} style={{ width: "24px", height: "24px" }} onClick={() => hideLoginModal} />
            </CrossIconContainer>
            <LogoContainer>
                <img src={logo} style={{ width: "36px", height: "36px" }} />
                <EmpasizedTypography>다담다</EmpasizedTypography>
            </LogoContainer>
            <TextContainer>
                <EmpasizedTypography>소셜 로그인하기</EmpasizedTypography>
                <DefaultTypography>다담다 서비스를 사용하기 위해</DefaultTypography>
                <DefaultTypography>로그인해주세요.</DefaultTypography>
            </TextContainer>
            <hr />
            <ButtonContainer>
                <button style={{ width: "80%" }} onClick={googleSocialLogin}>구글로 시작하기</button>
                <button style={{ width: "80%" }}>카카오로 시작하기</button>
                <button style={{ width: "80%" }}>네이버로 시작하기</button>
            </ButtonContainer>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    width: 390px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: ${theme.style.shadow};
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 500px) {
      width: 300px;
  }
`

const CrossIconContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    box-sizing: border-box;
`

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    align-items: center;
    padding-bottom: 20px;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    width: 80%;
    box-sizing: border-box;
`

const DefaultTypography = styled.span`
    font-size: 14px;
`

const EmpasizedTypography = styled.span`
    font-size: 20px;
    font-weight: bold;
`

export default LoginModal;