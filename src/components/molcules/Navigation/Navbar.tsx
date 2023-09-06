import styled from 'styled-components';

import theme from '../../../assets/styles/theme';
import { Link, useLocation } from 'react-router-dom';
import { Box, MenuItem, Typography } from '@mui/material';

import { BoardIcon, TotalIcon, ArticleIcon, ProductIcon, VideoIcon, LocationIcon, EtcIcon } from '../../atoms/Icon';
import ColumnContainer from '../../atoms/ColumnContainer';
import ScrapNaviagtion from './ScrapNaviagtion';
import NavigationMenuItem from '../../atoms/Navigation/NavigationMenuItem';

const boardMenuItem = {
    name: '보드',
    icon: <BoardIcon size='24' fill={theme.color.Gray_090} color='#B8C2CC' />,
    selectedIcon: <BoardIcon size='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
    link: '/board',
};

function Navbar() {
    const { pathname } = useLocation();

    return (
        <Box sx={{
            flexDirection: 'column',
            padding: '24px',
            width: '209px',
            height: '100%',
            boxSizing: 'border-box',
            position: 'fixed',
            backdropFilter: 'blur(4px)',
            display: {
                xs: 'none',
                sm: 'flex',
            }
        }}>
            <ColumnContainer>
                <Typography
                    variant='h5'
                    color={theme.color.Gray_080}
                    sx={{
                        fontWeight: '600',
                        mb: '8px',
                    }}>
                    보드
                </Typography>
                <NavigationMenuItem item={boardMenuItem} isActive={pathname === boardMenuItem.link} />
                <Typography
                    variant='h5'
                    color={theme.color.Gray_080}
                    sx={{
                        fontWeight: '600',
                        mb: '8px',
                        mt: '32px',
                    }}>
                    스크랩
                </Typography>
                <ScrapNaviagtion />
            </ColumnContainer >
        </Box >
    );
}

export default Navbar;
