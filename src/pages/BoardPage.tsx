import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/molcules/Navbar';
import theme from '../assets/styles/theme';

function BoardPage() {
    return (
        <PageWrapper>
            <Navbar />
            <OutletWrapper>
                <Outlet />
            </OutletWrapper>
        </PageWrapper >
    );
}

const PageWrapper = styled.div`
   display: flex;
    width: 100%;
    height: 100%; 
`

const OutletWrapper = styled.div`
    width: calc(100vw - 200px);
    height: calc(100vh - 50px);
    background-color: ${theme.color.background_color};
    position: fixed;
    right: 0;
    top: 50px;
    display: flex;
    overflow: auto;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
`

export default BoardPage;
