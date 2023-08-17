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
                    <Typography variant="h3" fontWeight={700} sx={{
                        paddingBottom: '15px',
                    }}>
                        클릭만 하면 자동 저장
                    </Typography>
                    <Typography sx={{
                        opacity: '0.7',
                        paddingBottom: '30px',
                        fontSize: '18px',
                    }}>
                        Your business needs to be in safe hands at all times. We ensure you
                        never run out of customers and not run at loss. We are trusted by
                        over 500+ companies to deliver quality marketing campaigns using
                        Digital marketing & Offline marketing channels.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                    >
                        크롬 익스텐션 다운로드
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Howto;