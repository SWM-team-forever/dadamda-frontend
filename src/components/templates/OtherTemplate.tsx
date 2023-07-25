import { useState } from 'react';
import styled from 'styled-components';

import { PRODUCT_DATAS } from '../../config';
import theme from '../../assets/styles/theme';
import searchIcon from '../../assets/icons/SearchIcon.png';

function OtherTemplate() {
    const [productDatas] = useState(PRODUCT_DATAS);

    return (
        <ScrapListContainer>
            <ScrapListHeader>
                <ScarpCountWrapper>
                    <EmpasizedTypography>0 </EmpasizedTypography>
                    <DefaultTypography>개의 </DefaultTypography>
                    <EmpasizedTypography>기타 스크랩</EmpasizedTypography>
                    <DefaultTypography>이 있습니다.</DefaultTypography>
                </ScarpCountWrapper>
                <SearchBar>
                    <SearchIconWrapper src={searchIcon} />
                    <EmpasizedTypography>Search</EmpasizedTypography>
                </SearchBar>
            </ScrapListHeader>
            <ScrapList>
                <EmpasizedTypography>스크랩을 추가해주세요</EmpasizedTypography>
            </ScrapList>
        </ScrapListContainer>
    )
}

const ScrapListContainer = styled.div`
    width: calc(100% - 200px);
    height: 100%;
    background-color: ${theme.color.background_color};
    left: 200px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
`

const ScrapListHeader = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
`

const ScrapList = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
`

const ScarpCountWrapper = styled.div`

`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const EmpasizedTypography = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const SearchIconWrapper = styled.img`
    width: 24px;
    height: 24px;
`

export default OtherTemplate;