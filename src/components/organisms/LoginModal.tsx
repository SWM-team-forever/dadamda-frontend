import styled from 'styled-components';

import theme from '../../assets/styles/theme';
import CrossIcon from '../../assets/icons/CrossIcon.png';
import logo from '../../assets/images/dadamda-logo128.png';
import ColumnContainer from '../atoms/ColumnContainer';
import { googleLoginURL } from '../../secret';
import LoginButton from '../atoms/LoginButton';
import googleLogo from '../../assets/icons/btn_google_light_normal_ios.svg';
import naverLogo from '../../assets/icons/btnG_아이콘사각.png';
import kakaoLogo from '../../assets/icons/kakao_login_large_wide.png';

interface LoginModalProps {
    hideLoginModal: () => void;
}

function LoginModal({ hideLoginModal }: LoginModalProps) {
    const oAuthHandler = (): void => {
        window.location.href = googleLoginURL;
    };

    return (
        <ModalContainer>
            <CrossIconContainer>
                <img src={CrossIcon}
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                    onClick={hideLoginModal}
                />
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
            <ButtonContainer>
                <ColumnContainer style={{ width: '100%', gap: "10px" }}>
                    <LoginButton
                        text={'구글로 시작하기'}
                        iconSource={googleLogo}
                        style={{ color: theme.color.icon_color, backgroundColor: 'white' }}
                        onClick={oAuthHandler}
                    />
                    {/* <img src={kakaoLogo} />
                    <LoginButton
                        text={'네이버로 시작하기'}
                        iconSource={naverLogo}
                        style={{ color: 'white', backgroundColor: '#03C75A' }} /> */}
                </ColumnContainer>
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
    padding: 20px;
    box-sizing: border-box;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    width: 100%;
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
