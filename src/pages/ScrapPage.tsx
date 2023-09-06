import styled from 'styled-components';

import Navbar from '../components/molcules/Navigation/Navbar';
import { Outlet } from 'react-router-dom';

function ScrapPage() {
  return (
    <ScrapTemplateContainer>
      <Navbar />
      <Outlet />
    </ScrapTemplateContainer>
  );
}

const ScrapTemplateContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

export default ScrapPage;
