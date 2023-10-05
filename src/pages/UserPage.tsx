import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Button from '../components/atoms/DefaultButton';
import RowContainer from '../components/atoms/RowContainer';

import theme from '../assets/styles/theme';
import { GET_USER_INFORMATION_URL } from '../secret';
import defaultUserImage from '../assets/images/Avatar.png';
import useWarningSnackbar from '../hooks/useWarningSnackbar';
import { useLogout } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';

function UserPage() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [accountProvider, setAccountProvider] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = GET_USER_INFORMATION_URL;
        token && fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            },
        })
            .then((response) => {
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
            .then((data) => {
                setUserName(data.data.name);
                setUserEmail(data.data.email);
                setAccountProvider(data.data.provider);
                setProfileImageUrl(data.data.profileUrl);
            });
    }, []);

    const userPageMenu = [
        {
            name: '이름',
            content: userName,
        },
        {
            name: '이메일',
            content: userEmail,
        },
        {
            name: '연결된 소셜 계정',
            content: `${accountProvider} 계정으로 가입되셨습니다.`
        }];

    const { openModal } = useModal();
    const handleLogout = useLogout();

    return (
        <>
            <Wrapper>
                <UserInfoWrapper>
                    <ProfileContainer>
                        {profileImageUrl
                            ? <ProfileImage src={profileImageUrl} />
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
                    <RowContainer>
                        <Button buttonStyle={'gray'} label={'로그아웃'} isRound onClick={handleLogout} />
                        <Button buttonStyle={'text-only'} label={'탈퇴하기'} onClick={() => openModal('userDelete')} />
                    </RowContainer>
                </UserInfoWrapper>
            </Wrapper>
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
