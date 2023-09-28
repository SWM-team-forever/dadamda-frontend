import styled from 'styled-components';
import { useEffect } from 'react';

import ChannelService from '../../ChannelService';
import { CHANNEL_SERVICE_PLUGIN_KEY } from '../secret';

import Hero from '@/components/templates/mainPage/Hero';
import Footer from '../components/templates/mainPage/Footer';
import Section1 from '@/components/templates/mainPage/Section1';
import Section2 from '@/components/templates/mainPage/Section2';
import Section3 from '@/components/templates/mainPage/Section3';
import Section4 from '@/components/templates/mainPage/Section4';
import Section5 from '@/components/templates/mainPage/Section5';
import Section6 from '@/components/templates/mainPage/Section6';

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
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.div`    
    width: 100%;
    height: calc(100vh - 56px);
    position: fixed;
    top: 56px;
    overflow: auto;
`

export default MainPage;
