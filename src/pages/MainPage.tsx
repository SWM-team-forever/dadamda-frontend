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
import Footer from '../components/templates/mainPage/Footer';

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
      <Section />
      <Howto />
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
