import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import howto from '../../../assets/images/howto.png';

const Howto = () => {

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            minHeight: '400px',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '30px 0px 50px 0px',
        }}>
            <Grid container spacing={6} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1300px',
                padding: '50px',
            }}>
                <Grid item xs={12} md={5}>
                    <img src={howto} alt="how to" style={{
                        width: '100%',
                    }} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight={700} sx={{
                        paddingBottom: '15px',
                    }}>
                        클릭만 하면 자동 저장
                    </Typography>
                    <Typography sx={{
                        opacity: '0.7',
                        paddingBottom: '30px',
                        fontSize: '18px',
                        wordBreak: 'keep-all',
                    }}>
                        사용자의 편의를 위해 크롬 익스텐션이 개발되었습니다. 이제는 스크랩 추가를
                        원하는 페이지에서 버튼 클릭 한 번만으로 쉽게 추가할 수 있습니다.
                        크롬 익스텐션 설치를 원하시면 하단 버튼을 클릭해주세요.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                        onClick={() =>
                            location.href = 'https://chrome.google.com/webstore/detail/dadamda/kgaiabolccidmgihificdfaimdlfmcfj?hl=ko'
                        }
                    >
                        크롬 익스텐션 다운로드
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Howto;
