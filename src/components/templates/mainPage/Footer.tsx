import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import theme from '../../../assets/styles/theme';

const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <Box sx={{
            flexGrow: 1,
            background: theme.color.background_color,
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Typography sx={{ fontSize: '0.625rem', }}>서울특별시 강남구 테헤란로 311(역삼동) 아남타워빌딩 7층(06151)</Typography>
            <Typography sx={{ fontSize: '0.625rem', }}>기업 또는 이용 문의: dadamda.corporation@gmail.com</Typography>
            <Typography sx={{ fontSize: '0.625rem', }}>COPYRIGHT 2023 dadamda Co. All RIGHTS RESERVED.</Typography>
            <Typography sx={{ fontSize: '0.625rem', }}>
                <Link href='/privacy' target="_blank" underline="none" style={{
                    textDecoration: 'none',
                    color: theme.color.text_gray_color,
                }}>
                    개인 정보 처리 방침
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
