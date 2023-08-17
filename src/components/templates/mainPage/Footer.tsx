import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography >
                Provided by{' '}
                <Link href="https://appseed.us" target="_blank" underline="none">
                    AppSeed
                </Link>
            </Typography>
            <Typography>Open-Source Sample - Buit with MUI</Typography>
        </Box>
    );
};

export default Footer;