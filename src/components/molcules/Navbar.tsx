import styled from 'styled-components';

import theme from '../../assets/styles/theme';
import { NavLink } from 'react-router-dom';
import otherIcon from '../../assets/icons/AddIcon.png';
import mapIcon from '../../assets/icons/DiscoverIcon.png';
import productIcon from '../../assets/icons/LabelIcon.png';
import listIcon from '../../assets/icons/ListIcon.png';
import articleIcon from '../../assets/icons/PageIcon.png';
import boardIcon from '../../assets/icons/SwitcherIcon.png';
import videoIcon from '../../assets/icons/VideoIcon.png';

const NavbarMenus = [{
    title: '보드',
    items: [{
        name: '보드',
        icon: boardIcon,
        link: '/board',
    }],
}, {
    title: '스크랩',
    items: [{
        name: '전체',
        icon: listIcon,
        link: '/scrap/list',
    }, {
        name: '아티클',
        icon: articleIcon,
        link: '/scrap/article',
    }, {
        name: '상품',
        icon: productIcon,
        link: '/scrap/product',
    }, {
        name: '비디오',
        icon: videoIcon,
        link: '/scrap/video',
    }, {
        name: '장소',
        icon: mapIcon,
        link: '/scrap/location',
    }, {
        name: '기타',
        icon: otherIcon,
        link: '/scrap/other',
    }]
}]

function Navbar() {
    return (
        <NavbarContainer>
            {NavbarMenus.map(list => {
                return <ListContainer>
                    <ListTitleTypography>{list.title}</ListTitleTypography>
                    {list.items.map(item => {
                        return <ItemContainer to={item.link}>
                            <ItemIcon src={item.icon} />
                            {item.name}
                        </ItemContainer>;
                    })}
                </ListContainer>;
            })}
        </NavbarContainer >
    );
}

const NavbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    box-shadow: ${theme.style.shadow};
    width: 200px;
    height: 100%;
    @media screen and (max-width: 600px) {
      display: none;
    }
    gap: 30px;
    background: white;
    box-sizing: border-box;
    position: fixed;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const ListTitleTypography = styled.span`
    color: ${theme.color.text_gray_color};
    font-size: 12px;
    padding: 0 5px;
`

const ItemContainer = styled(NavLink)`
    display: flex;
    color: ${theme.color.text_gray_color};
    font-size: 14px;
    align-items: center;
    text-decoration: none;
    gap: 10px;
    padding: 10px;
    border-radius: 4px;
    &.active{
        background-color: ${theme.color.background_color};
    }
`

const ItemIcon = styled.img`
    width: 24px;
    height: 24px;
`

export default Navbar;
