import { Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import heroImage from '../../../assets/images/heroImage.png'
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
                        onClick={startButtonHandler}
                    >
                        서비스 시작하기
                    </Button>
                </Grid>
                <Grid item xs={12} md={7}>
                    <img src={heroImage} alt="My Team" style={{
                        width: '100%',
                        boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.15) 0px 8px 30px',
                    }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;
