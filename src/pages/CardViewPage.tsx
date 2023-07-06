import {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components';
import ProductTemplate from '../components/ProductTemplate';
import Sidebar from '../components/Sidebar';
import Masonry from '@mui/lab/Masonry';
import { PRODUCT_DATAS } from '../config';

function CardViewPage() {

  const [initProductTemplates, setInitProductTemplates] = useState(PRODUCT_DATAS);
  // const productURL = "https://0nyhd85jc9.execute-api.ap-northeast-2.amazonaws.com/beta/scrap";
  // const getProductList = useCallback(
  //     () => 
  //     fetch(productURL)
  //     .then(response => response.json())
  //     .then(( data ) => {
  //       return data
  //     })
  //   , []);

  // useEffect(() => {
  //   getProductList().then(data => setInitProductTemplates(data))
  // }, [getProductList]);


  return (
    <Container>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <CardArea>
        
          <Masonry columns={{ xs: 1, sm: 2, md: 3}} spacing={2}>
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
      width: 0;
  }
`

const CardArea = styled.div`
    width: 90vw;
  @media screen and (max-width: 468px) {
      width: 100vw;
  }
  }
`
export default CardViewPage
