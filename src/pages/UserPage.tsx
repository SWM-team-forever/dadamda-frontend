import Button from '../components/atoms/DefaultButton';
import styled from 'styled-components';
import theme from '../assets/styles/theme';
import UserConsumer from '../context/UserContext';

function UserPage() {

    const [user] = UserConsumer();
    return (
        <>
            <Wrapper>
                <UserInfoWrapper>
                    <ProfileContainer>
                        <ProfileImage src={user.profile_url} />
                        <Button label='이미지 변경하기' buttonStyle='primary' isRound />
                    </ProfileContainer>
                    <Content>
                        <TextWrapper>
                            <DefaultTypography><b>이름</b></DefaultTypography>
                            <DefaultTypography>영원한_제로</DefaultTypography>
                        </TextWrapper>
                        <TextWrapper>
                            <DefaultTypography><b>이메일</b></DefaultTypography>
                            <DefaultTypography>lukey0515@gmail.com</DefaultTypography>
                        </TextWrapper>
                        <TextWrapper>
                            <DefaultTypography><b>연결된 소셜 계정</b></DefaultTypography>
                            <DefaultTypography>구글 계정으로 가입하셨습니다.</DefaultTypography>
                        </TextWrapper>
                    </Content>
                </UserInfoWrapper>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.color.background_color};
    padding-top: 50px;
`

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ProfileImage = styled.img`
    width: 128px;
    height: 128px;
    border-radius: 100%;
`

const UserInfoWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 80px;
    align-items: center;
    background-color: white;
    height: 100%;
    padding-top: 50px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TextWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.secondary_text_gray_color};
`

export default UserPage;
