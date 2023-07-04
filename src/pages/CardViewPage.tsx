import {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components';
import ProductTemplate from '../components/ProductTemplate';
import Sidebar from '../components/Sidebar';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

function CardViewPage() {

  const [initProductTemplates, setInitProductTemplates] = useState([]);
  const productURL = "https://0nyhd85jc9.execute-api.ap-northeast-2.amazonaws.com/beta/scrap";
  const getProductList = useCallback(
      () => 
      fetch(productURL)
      .then(response => response.json())
      .then(( data ) => {
        return data
      })
    , []);

  useEffect(() => {
    getProductList().then(data => setInitProductTemplates(data))
  }, [getProductList]);

  return (
    <Container>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <CardArea>
        <Box sx={{ width: "90%" }}>
          <Masonry columns={1} spacing={2}>
            {initProductTemplates.map((product, index) => {
              //console.log(product);
              return <ProductTemplate
              url={product.url}
              image={product.image}
              title={product.title}
              type={product.type}
              price={product.price}
              key={index}/>
            }
            )}
          </Masonry>
        </Box>
      </CardArea>

    </Container>
  )
}

const Container = styled.div`
    background-color: #dcdefe;
    width: 100vw;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: space-around;
    padding: 10px;
`
const SidebarArea = styled.div`
  width: 7vw;
  background-color: transparent;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 468px) {
        width: 100%;
    }
`

const CardArea = styled.div`
    width: 90vw;
`
export default CardViewPage
