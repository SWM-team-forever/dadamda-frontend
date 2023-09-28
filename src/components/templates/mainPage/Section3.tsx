import section3Image1 from '@/assets/images/landing/section3/section3Image1.png';
import section3Image2 from '@/assets/images/landing/section3/section3Image2.png';
import theme from '@/assets/styles/theme';
import { Box, Grid, Typography } from '@mui/material';

function Section3() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            maxHeight: 'calc(100% + 56px)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundColor: theme.color.Blue_080,
        }}>
            <Grid container spacing={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '1300px',
                    m: 0,
                    justifyContent: 'center',
                    height: '100%',
                }}>
                <Grid item xs={12} sm={4}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                            mt: '50px',
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: {
                                xs: '8px',
                                sm: '16px',
                            }
                        }}
                    >
                        <Typography sx={{
                            color: '#FFBB36',
                            fontSize: '18px',
                            fontWeight: '700',
                            lineHeight: '160%',

                        }}>
                            # 빠른 저장
                        </Typography>
                        <Typography sx={{
                            color: 'white',
                            fontSize: {
                                xs: '26px',
                                sm: '32px',
                            },
                            fontWeight: '700',
                            lineHeight: '140%',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}>
                            클릭 한번으로 링크 저장!<br />
                            그것도 보기 좋게.
                        </Typography>
                        <Typography sx={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '150%',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}>
                            저장한 링크는 콘텐츠로 저장해줘요.
                        </Typography>
                    </Box>
                    <img src={section3Image1} alt="section3Image1" style={{
                        width: '100%',
                    }} />
                </Grid>
                <Grid item xs={12} sm={8}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        p: '0',
                        boxSizing: 'border-box',
                        transform: {
                            xs: 'translateY(50%)',
                            sm: 'translateY(0)',
                        }
                    }}
                >
                    <Box
                        sx={{
                            transform: {
                                xs: 'scale(2)',
                                sm: 'scale(1)',
                            },
                        }}
                    >
                        <img src={section3Image2} alt="section3Image2" style={{
                            width: '100%',
                        }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Section3;
