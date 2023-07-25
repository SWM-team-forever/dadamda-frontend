import styled from 'styled-components';

import Navbar from '../molcules/Navbar';
import { Outlet } from 'react-router-dom';

function ScrapTemplate() {
    return (
        <ScrapTemplateContainer>
            <Navbar />
            <Outlet />
        </ScrapTemplateContainer>
    );
}

const ScrapTemplateContainer = styled.div`
    display: flex;
    padding-top: 50px;
    width: 100%;
    height: calc(100vh - 50px);
`

export default ScrapTemplate;
