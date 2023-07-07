import { useState }from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdProductionQuantityLimits, MdOutlineArticle, MdOutlineMap, MdOutlineOndemandVideo, MdAccessibility, MdList } from 'react-icons/md';
import styled from 'styled-components';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

type MenuProps = {
    icon: object,
    label: string
}

function Menu({icon, label}: MenuProps) {
    return (
        <MenuItem>
            {icon}
            <span>{label}</span>
        </MenuItem>
    )
}


function Sidebar() {
    const [value, setValue] = useState('상품');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const menus = [
        {
            icon: <MdOutlineDashboard/>,
            label: "보드",
            route: "board",
        },
        {
            icon: <MdList/>,
            label: "전체",
            route: "entire",
        },
        {
            icon: <MdProductionQuantityLimits/>,
            label: "상품",
            route: "product",
        },
        {
            icon: <MdOutlineArticle/>,
            label: "아티클",
            route: "article",
        },
        {
            icon: <MdOutlineMap/>,
            label: "지도",
            route: "map",
        },
        {
            icon: <MdOutlineOndemandVideo/>,
            label: "비디오",
            route: "video",
        },
        {
            icon: <MdAccessibility/>,
            label: "기타",
            route: "other",
        }
    ]

    return (
        <>
            <SidebarWrapper>
                {menus.map((menu, index) => {
                    return <Link to={`/scrap/${menu.route}`}><Menu 
                    icon={menu.icon}
                    label={menu.label}
                    key={index}/>
                    </Link>
                })}
            </SidebarWrapper>

            <MobileSidebar>
                <BottomNavigation value={value} onChange={handleChange}>
                    {menus.map((menu, index) => {
                        return <BottomNavigationAction
                            style={{ margin: 0 }}
                            label={menu.label}
                            value={menu.label}
                            icon={menu.icon}
                            key={index}
                        />
                    })}
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
    margin: 20px;
    transform: translate(0, -50%);
    @media screen and (max-width: 468px) {
        display: none;
    }
    span {
        @media screen and (max-width: 700px) {
            display: none;
            font-size: 0.8em;
        }
    }
`

const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    svg {
        width: 90%;
        height: 90%;
        max-width: 3rem;
        max-height: 3rem;
    }
    span {
        @media screen and (max-width: 468px) {
            display: none;
        }
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

export default Sidebar;
