import styled from 'styled-components';
import { Box } from '@mui/material';

import { googleLoginURL, kakaoLoginURL } from '@/secret';
import theme from '@/assets/styles/theme';
import googleLogo from '@/assets/icons/google_login.png';
import kakaoLogo from '@/assets/icons/kakao_logo.png';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import LoginButton from '@/components/atoms/LoginButton';

function LoginModalElement() {
    const oAuthHandler = (loginProvider: string): void => {
        window.location.href = loginProvider === 'google' ? googleLoginURL : kakaoLoginURL;
    };

    const loginProviderInformation = {
        google: {
            url: googleLoginURL,
            source: googleLogo,
            style: { color: theme.color.icon_color, backgroundColor: 'white' }
        },
        kakao: {
            url: kakaoLoginURL,
            source: kakaoLogo,
            style: { color: 'rgba(0, 0, 0, 0.85)', backgroundColor: '#FEE500' }
        }
    }

    return (
        <Box>
            <TextContainer>
                <DefaultTypography>다담다 서비스를 사용하기 위해</DefaultTypography>
                <DefaultTypography>로그인해주세요.</DefaultTypography>
            </TextContainer>
            <ButtonContainer>
                <ColumnContainer style={{ width: '100%', gap: "10px" }}>
                    <LoginButton
                        text={'구글로 시작하기'}
                        iconSource={googleLogo}
                        style={{ color: theme.color.icon_color, backgroundColor: 'white' }}
                        onClick={() => oAuthHandler('google')}
                    />
                    <LoginButton
                        text={'카카오로 시작하기'}
                        iconSource={kakaoLogo}
                        style={{ color: 'rgba(0, 0, 0, 0.85)', backgroundColor: '#FEE500' }}
                        onClick={() => oAuthHandler('kakao')}
                    />
                </ColumnContainer>
            </ButtonContainer>
        </Box>
    );
}

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

export default LoginModalElement;
