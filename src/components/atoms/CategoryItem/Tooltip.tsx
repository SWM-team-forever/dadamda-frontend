import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';
import { ScrapCardSeeMoreIcon } from '../Icon';
import { useState } from 'react';
import theme from '../../../assets/styles/theme';

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenScrapEditOrDeleteMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseScrapEditOrDeleteMenu = () => {
        setAnchorEl(null);
    };

    const menuItemContentList = [
        {
            title: '스크랩 수정',
            clickAction: (e) => {
                e.stopPropagation();
                handleCloseScrapEditOrDeleteMenu();
            }
        },
        {
            title: '스크랩 삭제',
            clickAction: (e) => {
                e.stopPropagation();
                handleCloseScrapEditOrDeleteMenu();
            }
        }
    ]

    return (
        <Box>
            <Box
                sx={{
                    width: '16px',
                    height: '16px',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpenScrapEditOrDeleteMenu(e);
                }}>
                <ScrapCardSeeMoreIcon width='16' height='16' fill='#24292E' />
            </Box>
            <Menu
                sx={{
                    '& .MuiPaper-root': {
                        boxShadow: 'none',
                        padding: '6px',
                    },
                    '& .MuiList-root': {
                        padding: '0px',
                    },
                    mt: '24px',
                    fill: '#FFF',
                    filter: 'drop-shadow(0px 2px 16px rgba(19, 48, 74, 0.08))',
                }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseScrapEditOrDeleteMenu}
            >
                {menuItemContentList.map((menuItem) => (
                    <MenuItem
                        key={menuItem.title}
                        onClick={menuItem.clickAction}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#F3F7FE',
                            },
                            padding: '6px 8px',
                            color: theme.color.Blue_dry,
                        }}>
                        <Typography textAlign="center" variant='h5'>{menuItem.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}