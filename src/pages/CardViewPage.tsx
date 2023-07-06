import { useState } from 'react';
import styled from 'styled-components';
import ProductTemplate from '../components/ProductTemplate';
import Sidebar from '../components/Sidebar';
import Masonry from '@mui/lab/Masonry';
import { PRODUCT_DATAS } from '../config';

function CardViewPage() {

  const [productDatas, setProductDatas] = useState(PRODUCT_DATAS);

  return (
    <Container>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <CardArea>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {productDatas.map((product, index) => {
            return <ProductTemplate
              url={product.url}
              image={product.image}
              title={product.title}
              type={product.type}
              price={product.price}
              key={index} />
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
