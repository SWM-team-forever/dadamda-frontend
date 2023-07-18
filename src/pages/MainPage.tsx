import React from 'react'
import styled from 'styled-components';
import theme from '../assets/styles/theme';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/Avatar.png';


function MainPage() {
  return (
    <>
        <BackgroundContainer>메인 페이지</BackgroundContainer>
        <LogoImg src={logo}/>
        <Avatar src={avatar}/>
    </>
  )
}

const BackgroundContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.color.background_color};
`

const LogoImg = styled.img`
    height: 25px;
    width: 125px;
`

const Avatar = styled.img`
    height: 25px;
    width: 25px;
`

export default MainPage;
