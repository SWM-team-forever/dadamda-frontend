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
    }],
}, {
    title: '스크랩',
    items: [{
        name: '전체',
        icon: listIcon,
    }, {
        name: '아티클',
        icon: articleIcon,
    }, {
        name: '상품',
        icon: productIcon,
    }, {
        name: '비디오',
        icon: videoIcon,
    }, {
        name: '장소',
        icon: mapIcon,
    }, {
        name: '기타',
        icon: otherIcon,
    }]
}]

function Navbar() {
    return (
        <NavbarContainer>
            {NavbarMenus.map(list => {
                return <ListContainer>
                    <ListTitleTypography>{list.title}</ListTitleTypography>
                    {list.items.map(item => {
                        return <ItemContainer>
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
    padding: 60px 20px;
    box-shadow: ${theme.style.shadow};
    width: 200px;
    height: calc(100% - 50px);
    @media screen and (max-width: 600px) {
      display: none;
    }
    gap: 30px;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ListTitleTypography = styled.span`
    color: ${theme.color.text_gray_color};
    font-size: 12px;
`

const ItemContainer = styled(NavLink)`
    &:active {
        background: ${theme.color.background_color};
        color: ${theme.color.primary_color};
    }
    display: flex;
    color: ${theme.color.text_gray_color};
    font-size: 14px;
    align-items: center;
    text-decoration: none;
    gap: 10px;
`

const ItemIcon = styled.img`
    width: 24px;
    height: 24px;
`

const ItemTypography = styled(NavLink)`
    
`

export default Navbar;
