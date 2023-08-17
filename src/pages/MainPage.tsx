import styled from 'styled-components';
import theme from '../assets/styles/theme';
import Button from '../components/atoms/DefaultButton';
import ChannelService from '../../ChannelService';
import { CHANNEL_SERVICE_PLUGIN_KEY } from '../secret';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Hero from '../components/templates/mainPage/Hero';
import Section from '../components/templates/mainPage/Section';
import Howto from '../components/templates/mainPage/Howto';

function MainPage() {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      "pluginKey": CHANNEL_SERVICE_PLUGIN_KEY,
    });

    return () => ChannelService.hideChannelButton();
  });

  return (
    <>
      <Hero />
      <Section />
      <Howto />
      <LastContainer>
        <EmpasizedTypography><strong>세상 모든 컨텐츠를 다담다</strong></EmpasizedTypography>
        <TypographyGroup>
          <DefaultTypography>다담다 서비스는 사용자의 편의를 위해 크롬 익스텐션을 제공하고 있습니다.</DefaultTypography>
          <DefaultTypography>크롬 익스텐션을 설치하시겠습니까?</DefaultTypography>
        </TypographyGroup>
        <ButtonContainer>
          <Button label='크롬익스텐션 설치하기' fullWidth isRound buttonStyle='primary' />
          <Button label='웹으로 서비스 시작하기' fullWidth isRound buttonStyle='primary' />
        </ButtonContainer>
      </LastContainer>
    </>
  )
}


const BackgroundContainer = styled.div`    
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 600px) {
      flex-direction: column;
  }
  margin: 20px;
`

const TextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 20px;
`

const ImageContainer = styled.div`
  width: 50%;
  min-width: 300px;
  aspect-ratio: 16/9;
  background-color: ${theme.color.primary_color};
`

const EmpasizedTypography = styled.span`
  font-size: 1.75rem;
`

const DefaultTypography = styled.span`
  font-size: 0.875rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
`

const Content = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  @media screen and (max-width: 600px) {
      flex-direction: column;
  }
`

const ImageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`

const Image = styled.div`
  background-color: ${theme.color.primary_color};
  width: 80%;
  aspect-ratio: 1/1;
`
const LastContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`
const TypographyGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MainPage;
