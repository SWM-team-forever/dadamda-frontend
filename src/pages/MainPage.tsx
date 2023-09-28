import styled from 'styled-components';
import theme from '../assets/styles/theme';
import Button from '../components/atoms/DefaultButton';
import ChannelService from '../../ChannelService';
import { CHANNEL_SERVICE_PLUGIN_KEY } from '../secret';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Hero from '../components/templates/mainPage/Hero';
import Howto from '../components/templates/mainPage/Howto';
import Footer from '../components/templates/mainPage/Footer';
import Section1 from '@/components/templates/mainPage/Section1';
import Section2 from '@/components/templates/mainPage/Section2';

function MainPage() {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      "pluginKey": CHANNEL_SERVICE_PLUGIN_KEY,
    });

    return () => ChannelService.hideChannelButton();
  });

  return (
    <BackgroundContainer>
      <Hero />
      <Section1 />
      <Section2 />
      <Footer />
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.div`    
    width: 100%;
    height: calc(100vh - 50px);
    position: fixed;
    top: 50px;
    overflow: auto;
`

export default MainPage;
