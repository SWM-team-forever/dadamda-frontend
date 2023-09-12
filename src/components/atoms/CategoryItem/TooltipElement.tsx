import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

import theme from '../../../assets/styles/theme';
import { useTooltip } from '@/hooks/useTooltip';

export default function TooltipElement() {
    const { tooltip, closeTooltip } = useTooltip();
    const { anchorEl, menu, isOpen } = tooltip;

    return (
        <Menu
            sx={{
                '& .MuiPaper-root': {
                    boxShadow: 'none',
                    padding: '6px',
                },
                '& .MuiList-root': {
                    padding: '0px',
                },
                filter: 'drop-shadow(0px 2px 16px rgba(19, 48, 74, 0.08))',
                mt: '24px',
                fill: '#FFF',
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
            open={isOpen}
            onClose={(e: React.MouseEvent) => {
                e.stopPropagation();
                closeTooltip(e);
            }}
        >
            {menu && menu.map((menuItem) => (
                <MenuItem
                    key={menuItem.title}
                    onClick={menuItem.clickAction}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#F3F7FE',
                        },
                        padding: '6px 8px',
                        color: theme.color.Blue_dry,
                    }}

                >
                    <Typography textAlign="center" variant='h5'>{menuItem.title}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
}
