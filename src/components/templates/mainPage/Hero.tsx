import { Grid, Button, Box, Typography, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import heroImage from '@/assets/images/heroImage.png';
import heroText from '@/assets/images/heroText.png'
import { useModal } from '@/hooks/useModal';

const Hero = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { openModal } = useModal();

    const startButtonHandler = () => {
        token ? navigate('/scrap') : openModal('login');
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: 'calc(100% + 56px)',
            alignItems: {
                xs: 'flex-end',
                md: 'center',
            },
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#DAE9FF',
        }}>
            <Grid container spacing={6}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    maxWidth: '1300px',
                    m: 0,
                    justifyContent: 'center',
                    height: '100%',
                }}>
                <Grid item xs={12} md={10}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                            m: '100px 0 40px 0',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        p: '0',
                        boxSizing: 'border-box',
                    }}
                >
                    <img src={heroText} alt="scrap-text"
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                        }} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: '200px',
                                fontSize: '16px',
                                borderRadius: '40px',
                                fontWeight: '600',
                            }}
                            onClick={startButtonHandler}
                        >
                            무료로 다담다 시작하기
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: '200px',
                                fontSize: '16px',
                                borderRadius: '40px',
                                fontWeight: '600',
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                }
                            }}
                            onClick={startButtonHandler}
                        >
                            크롬 익스텐션 설치하기
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={10}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                        },
                        alignSelf: 'self-end'
                    }}
                >
                    <img src={heroImage} alt="scrap-image" style={{
                        width: '100%',
                    }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;
