import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/molcules/Navigation/Navbar';

function BoardPage() {
    return (
        <PageWrapper>
            <Navbar />
            <Outlet />
        </PageWrapper >
    );
}

const PageWrapper = styled.div`
   display: flex;
    width: 100%;
    height: 100%; 
`;

export default BoardPage;
