import styled from 'styled-components';
import { Box, Button } from '@mui/material';

import theme from '@/assets/styles/theme';
import defaultUserImage from '@/assets/images/Avatar.png';
import { useLogout } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';
import { useGetUserInformation } from '@/api/user';

function UserPage() {
    const { userInformation, isGetUserInformationLoading } = useGetUserInformation();

    const { openModal } = useModal();
    const handleLogout = useLogout();

    if (isGetUserInformationLoading) {
        return <div>로딩중</div>;
    }

    const { profileUrl, name, email, provider } = userInformation;

    const userPageMenu = [
        {
            name: '이름',
            content: name,
        },
        {
            name: '이메일',
            content: email,
        },
        {
            name: '연결된 소셜 계정',
            content: `${provider} 계정으로 가입되셨습니다.`
        }];

    return (
        <>
            <Wrapper>
                <UserInfoWrapper>
                    <ProfileContainer>
                        {profileUrl
                            ? <ProfileImage src={profileUrl} />
                            : <ProfileImage src={defaultUserImage} />
                        }
                    </ProfileContainer>
                    <Content>
                        {userPageMenu.map(menu => {
                            return (
                                <TextWrapper>
                                    <DefaultTypography><b>{menu.name}</b></DefaultTypography>
                                    <DefaultTypography>{menu.content}</DefaultTypography>
                                </TextWrapper>
                            )
                        })}
                    </Content>
                    <Box>
                        <Button
                            onClick={handleLogout}
                            color={'inherit'}
                        >
                            로그아웃
                        </Button>
                        <Button
                            onClick={() => openModal('userDelete')}
                            color={'inherit'}
                        >
                            탈퇴하기
                        </Button>
                    </Box>
                </UserInfoWrapper>
            </Wrapper >
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${theme.color.background_color};
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
