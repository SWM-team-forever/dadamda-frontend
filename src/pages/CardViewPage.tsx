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
      <Sidebar />

      <CardArea>
        <Box sx={{ width: 500, minHeight: 393 }}>
          <Masonry columns={3} spacing={2}>
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
    height: calc(100vh - 50px);
    display: flex;
`

const CardArea = styled.div`
    width: 90vw;
    background-color: #000000;
`
export default CardViewPage
