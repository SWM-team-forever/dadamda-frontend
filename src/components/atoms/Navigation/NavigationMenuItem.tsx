import { MenuItem, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import theme from "../../../assets/styles/theme"

function NavigationMenuItem({ item, isActive }: { item: any, isActive: boolean }) {
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
}

export default NavigationMenuItem;
