import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { ScrapCardSeeMoreIcon } from '../Icon';
import { useState } from 'react';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItemContentList = [
        {
            title: '스크랩 수정',
        },
        {
            title: '스크랩 삭제',
        }
    ]

    return (
        <div>
            <Box
                component='div'
                onClick={
                    (e) => {
                        e.stopPropagation();
                        handleClick(e);
                    }}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
                id='스크랩 수정 및 삭제 툴팁 버튼'
            >
                <ScrapCardSeeMoreIcon width='16' height='16' fill='#24292E' />
            </Box>
            <StyledMenu
                id="스크랩 수정 및 삭제 메뉴"
                MenuListProps={{
                    'aria-labelledby': '스크랩 수정 및 삭제 툴팁 버튼',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuItemContentList.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            onClick={handleClose}
                            disableRipple
                        >
                            {item.title}
                        </MenuItem>
                    )
                })}
            </StyledMenu>
        </div>
    );
}