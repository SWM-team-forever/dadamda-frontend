import React from 'react'
import styled from 'styled-components';
import theme from '../assets/styles/theme';
import logo from '../assets/logo.png';


function MainPage() {
  return (
    <>
        <BackgroundContainer>메인 페이지</BackgroundContainer>
        <LogoImg src={logo}/>
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

export default MainPage;
