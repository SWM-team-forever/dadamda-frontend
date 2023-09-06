import styled from 'styled-components';

import theme from '../../assets/styles/theme';
import { Link, useLocation } from 'react-router-dom';
import { Box, MenuItem, Typography } from '@mui/material';

import { BoardIcon, TotalIcon, ArticleIcon, ProductIcon, VideoIcon, LocationIcon, EtcIcon } from '../atoms/Icon';

const NavbarMenus = [{
    title: '보드',
    items: [{
        name: '보드',
        icon: <BoardIcon size='24' fill={theme.color.Gray_090} color='#B8C2CC' />,
        selectedIcon: <BoardIcon size='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
        link: '/board',
        index: 0,
    }],
}, {
    title: '스크랩',
    items: [{
        name: '전체',
        icon: <TotalIcon size='24' fill={theme.color.Gray_060} />,
        selectedIcon: <TotalIcon size='24' fill={theme.color.Blue_080} />,
        link: '/scrap/list',
        index: 1,
    }, {
        name: '아티클',
        icon: <ArticleIcon width='24' height='24' fill={theme.color.Gray_060} color={theme.color.Gray_090} />,
        selectedIcon: <ArticleIcon width='24' height='24' fill={theme.color.Blue_070} color={theme.color.Blue_080} />,
        link: '/scrap/article',
        index: 2,
    }, {
        name: '상품',
        icon: <ProductIcon size='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
        selectedIcon: <ProductIcon size='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
        link: '/scrap/product',
        index: 3,
    }, {
        name: '비디오',
        icon: <VideoIcon size='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
        selectedIcon: <VideoIcon size='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
        link: '/scrap/video',
        index: 4,
    }, {
        name: '장소',
        icon: <LocationIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} secondaryColor={theme.color.Gray_020} />,
        selectedIcon: <LocationIcon width='24' height='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} secondaryColor={theme.color.Gray_020} />,
        link: '/scrap/location',
        index: 5,
    }, {
        name: '기타',
        icon: <EtcIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
        selectedIcon: <EtcIcon width='24' height='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
        link: '/scrap/other',
        index: 6,
    }]
}]

function Navbar() {
    const { pathname } = useLocation();

    return (
        <Box sx={{
            flexDirection: 'column',
            padding: '24px',
            width: '209px',
            height: '100%',
            gap: '32px',
            boxSizing: 'border-box',
            position: 'fixed',
            backdropFilter: 'blur(4px)',
            display: {
                xs: 'none',
                sm: 'flex',
            }
        }}>
            {
                NavbarMenus.map(list => {
                    return (
                        <ListContainer>
                            <Typography
                                variant='h5'
                                color={theme.color.Gray_080}
                                sx={{
                                    fontWeight: '600',
                                    mb: '8px',
                                }}>
                                {list.title}
                            </Typography>
                            {list.items.map(item => {
                                const isActive = pathname === item.link;

                                return (
                                    <MenuItem
                                        component={Link}
                                        to={item.link}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            gap: '10px',
                                            padding: '9px 8px',
                                            borderRadius: isActive ? '8px' : '',
                                            background: isActive ? theme.color.Blue_060 : '',
                                        }}
                                    >
                                        {isActive ? item.selectedIcon : item.icon}
                                        <Typography
                                            variant='h4'
                                            color={isActive ? theme.color.Blue_080 : theme.color.Gray_090}
                                            sx={{
                                                fontWeight: '600',
                                            }}>
                                            {item.name}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                        </ListContainer >
                    )
                })
            }
        </Box >
    );
}

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export default Navbar;
