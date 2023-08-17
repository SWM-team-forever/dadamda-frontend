import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import heroImage from '../../../assets/images/heroImage.png'

const Hero = () => {

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            minHeight: '600px',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Grid container spacing={6} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1300px',
                padding: '50px',
            }}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h5" fontWeight={700} sx={{
                    }}>
                        뭘 좋아하는 지 몰라서
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{
                        paddingBottom: '15px',
                    }}>
                        다 준비해보았습니다
                    </Typography>
                    <Typography variant="h6" sx={{
                        opacity: '0.4',
                        wordBreak: 'keep-all',
                        paddingBottom: '15px',
                    }}>
                        내용에 따라 자동으로 북마크를 구성하는
                        신개념 컨텐츠 맞춤 스크랩 서비스, <strong>다담다</strong>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                    >
                        서비스 시작하기
                    </Button>
                </Grid>
                <Grid item xs={12} md={7}>
                    <img src={heroImage} alt="My Team" style={{
                        width: '100%',
                    }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;