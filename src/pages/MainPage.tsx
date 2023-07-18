import React from 'react'
import styled from 'styled-components';
import theme from '../assets/styles/theme';

function MainPage() {
  return (
    <>
        <BackgroundContainer>메인 페이지</BackgroundContainer>
    </>
  )
}

const BackgroundContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.color.background_color};
`

export default MainPage;
