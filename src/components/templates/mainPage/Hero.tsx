import { Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import heroImage from '@/assets/images/heroImage.png';
import heroText from '@/assets/images/heroText.png'
import { useModal } from '@/hooks/useModal';
import theme from '@/assets/styles/theme';

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
            height: '100%',
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
                    <Typography
                        fontWeight={700}
                        sx={{
                            fontSize: {
                                xs: '26px',
                                md: '32px',
                            },
                            wordBreak: 'keep-all',
                            textAlign: 'center',
                        }}
                        color={theme.color.Gray_090}
                    >
                        어떤 링크든!<br />
                        클릭 한 번이면 콘텐츠로 저장.
                    </Typography>
                    <Typography
                        fontWeight={400}
                        sx={{
                            fontSize: {
                                xs: '16px',
                                md: '18px',
                            },
                            wordBreak: 'keep-all',
                            textAlign: 'center',
                        }}
                        color={theme.color.Gray_090}
                    >
                        내용에 따라 자동으로 북마크를 구성하는<br />
                        신개념 컨텐츠 맞춤 스크랩 서비스, 다담다
                    </Typography>
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
