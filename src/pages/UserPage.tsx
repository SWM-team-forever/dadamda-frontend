import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Button from '../components/atoms/DefaultButton';

import theme from '../assets/styles/theme';
import { GET_USER_INFORMATION_URL } from '../secret';

function UserPage() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [accountProvider, setAccountProvider] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = GET_USER_INFORMATION_URL;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            },
        }).then((response) => response.json())
            .then((data) => {
                setUserName(data.data.name);
                setUserEmail(data.data.email);
                setAccountProvider(data.data.provider);
                setProfileImageUrl(data.data.profileUrl);
            });
    }, []);

    return (
        <>
            <Wrapper>
                <UserInfoWrapper>
                    <ProfileContainer>
                        <ProfileImage src={profileImageUrl} />
                        <Button label='이미지 변경하기' buttonStyle='primary' isRound />
                    </ProfileContainer>
                    <Content>
                        <TextWrapper>
                            <DefaultTypography><b>이름</b></DefaultTypography>
                            <DefaultTypography>{userName}</DefaultTypography>
                        </TextWrapper>
                        <TextWrapper>
                            <DefaultTypography><b>이메일</b></DefaultTypography>
                            <DefaultTypography>{userEmail}</DefaultTypography>
                        </TextWrapper>
                        <TextWrapper>
                            <DefaultTypography><b>연결된 소셜 계정</b></DefaultTypography>
                            <DefaultTypography>{accountProvider} 계정으로 가입하셨습니다.</DefaultTypography>
                        </TextWrapper>
                    </Content>
                    <a href='/privacy'><Button buttonStyle={'text-only'} label={'개인정보 보호'} /></a>
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
