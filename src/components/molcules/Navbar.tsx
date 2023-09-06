import styled from 'styled-components';

import theme from '../../assets/styles/theme';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

import { BoardIcon, TotalIcon, ArticleIcon, ProductIcon, VideoIcon, LocationIcon, EtcIcon } from '../atoms/Icon';

const NavbarMenus = [{
    title: '보드',
    items: [{
        name: '보드',
        icon: <BoardIcon size='24' fill={theme.color.Gray_090} color='#B8C2CC' />,
        link: '/board',
    }],
}, {
    title: '스크랩',
    items: [{
        name: '전체',
        icon: <TotalIcon size='24' fill={theme.color.Gray_060} />,
        activeIcon: <TotalIcon size='24' fill={theme.color.Blue_080} />,
        link: '/scrap/list',
    }, {
        name: '아티클',
        icon: <ArticleIcon width='24' height='24' fill={theme.color.Gray_060} color={theme.color.Gray_090} />,
        link: '/scrap/article',
    }, {
        name: '상품',
        icon: <ProductIcon size='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
        link: '/scrap/product',
    }, {
        name: '비디오',
        icon: <VideoIcon size='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
        link: '/scrap/video',
    }, {
        name: '장소',
        icon: <LocationIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} secondaryColor={theme.color.Gray_020} />,
        link: '/scrap/location',
    }, {
        name: '기타',
        icon: <EtcIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
        link: '/scrap/other',
    }]
}]

function Navbar() {
    return (
        <NavbarContainer>
            {NavbarMenus.map(list => {
                return (
                    <ListContainer>
                        <Typography
                            variant='h5'
                            color={theme.color.Gray_080}
                            sx={{
                                fontWeight: '600',
                            }}>
                            {list.title}
                        </Typography>
                        {list.items.map(item => {
                            return (
                                <ItemContainer to={item.link}>
                                    {item.icon}
                                    <Typography
                                        variant='h4'
                                        color={theme.color.Gray_090}
                                        sx={{
                                            fontWeight: '600',
                                            '&.active': {
                                                color: theme.color.Blue_080,
                                            }
                                        }}>
                                        {item.name}
                                    </Typography>
                                </ItemContainer>
                            )
                        })}
                    </ListContainer>
                )
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
    box-sizing: border-box;
    position: fixed;
    backdrop-filter: blur(4px);
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
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
        border-radius: 8px;
        background: ${theme.color.Blue_060};
    }
`

export default Navbar;
