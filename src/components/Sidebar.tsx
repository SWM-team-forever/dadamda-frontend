import React from 'react';
import { MdOutlineDashboard, MdProductionQuantityLimits, MdOutlineArticle, MdOutlineMap, MdOutlineOndemandVideo, MdAccessibility } from 'react-icons/md';
import styled from 'styled-components';

function Sidebar() {
    return (
        <SidebarWrapper>
            <Board>
                <MdOutlineDashboard style={{ width: "3rem", height: "3rem" }} />
                <span>보드</span>
            </Board>
            <Product>
                <MdProductionQuantityLimits style={{ width: "3rem", height: "3rem" }} />
                <span>상품</span>
            </Product>
            <Article>
                <MdOutlineArticle style={{ width: "3rem", height: "3rem" }} />
                <span>아티클</span>
            </Article>
            <Map>
                <MdOutlineMap style={{ width: "3rem", height: "3rem" }} />
                <span>지도</span>
            </Map>
            <Video>
                <MdOutlineOndemandVideo style={{ width: "3rem", height: "3rem" }} />
                <span>비디오</span>
            </Video>
            <Etc>
                <MdAccessibility style={{ width: "3rem", height: "3rem" }} />
                <span>기타</span>
            </Etc>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 10px;
`

const Board = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Product = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Article = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Map = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Video = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Etc = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default Sidebar;
