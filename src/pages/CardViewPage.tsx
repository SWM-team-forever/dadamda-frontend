import React from 'react';
import styled from 'styled-components';
import ProductTemplate from '../components/ProductTemplate';
import Sidebar from '../components/Sidebar';

function CardViewPage() {
  return (
    <Container>
        <Sidebar/>
        
        <CardArea>
            <ProductTemplate/>
        </CardArea>

    </Container>
  )
}

const Container = styled.div`
    background-color: #dcdefe;
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
`



const CardArea = styled.div`

`
export default CardViewPage
