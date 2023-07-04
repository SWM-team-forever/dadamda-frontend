import React from 'react';
import { MdOutlineDashboard, MdProductionQuantityLimits, MdOutlineArticle, MdOutlineMap, MdOutlineOndemandVideo, MdAccessibility, MdList } from 'react-icons/md';
import styled from 'styled-components';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

function Sidebar() {

    const [value, setValue] = React.useState('상품');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <SidebarWrapper>
                <Board>
                    <MdOutlineDashboard style={{ width: "2.5rem", height: "2.5rem" }} />
                    <span>보드</span>
                </Board>
                <Scrap>
                    <MdList style={{ maxWidth: "3rem", maxHeight: "3rem", width: "90%", height: "90%" }} />
                    <span>전체</span>
                </Scrap>
                <Product>
                    <MdProductionQuantityLimits style={{ maxWidth: "3rem", maxHeight: "3rem", width: "90%", height: "90%" }} />
                    <span>상품</span>
                </Product>
                <Article>
                    <MdOutlineArticle style={{ maxWidth: "3rem", maxHeight: "3rem", width: "90%", height: "90%" }} />
                    <span>아티클</span>
                </Article>
                <Map>
                    <MdOutlineMap style={{ maxWidth: "3rem", maxHeight: "3rem", width: "90%", height: "90%" }} />
                    <span>지도</span>
                </Map>
                <Video>
                    <MdOutlineOndemandVideo style={{ maxWidth: "3rem", maxHeight: "3rem", width: "90%", height: "90%" }} />
                    <span>비디오</span>
                </Video>
                <Etc>
                    <MdAccessibility style={{ maxWidth: "3rem", maxHeight: "3rem", width: "90%", height: "90%" }} />
                    <span>기타</span>
                </Etc>
            </SidebarWrapper>

            <MobileSidebar>
                <BottomNavigation value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="보드"
                        value="보드"
                        icon={<MdOutlineDashboard />}
                    />
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="전체"
                        value="전체"
                        icon={<MdList />}
                    />
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="상품"
                        value="상품"
                        icon={<MdProductionQuantityLimits />}
                    />
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="아티클"
                        value="아티클"
                        icon={<MdOutlineArticle />}
                    />
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="지도"
                        value="지도"
                        icon={<MdOutlineMap />}
                    />
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="비디오"
                        value="비디오"
                        icon={<MdOutlineOndemandVideo />}
                    />
                    <BottomNavigationAction
                        style={{ margin: 0 }}
                        label="기타"
                        value="기타"
                        icon={<MdAccessibility />}
                    />
                </BottomNavigation>
            </MobileSidebar>
        </>
    )
}

const SidebarWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 7vw;
    padding: 15px 0;
    box-sizing: border-box;
    height: fit-content;
    border-radius: 1rem;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);

    @media screen and (max-width: 468px) {
        display: none;
    }

    span {
        font-size: 0.8em;
    }
`

const MobileSidebar = styled.div`
    background-color: white;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;

    @media screen and (min-width: 468px) {
        display: none;
    }

    button {
        min-width: 13%;
        padding: 0;
    }
`

const Board = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Scrap = styled.div`
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
