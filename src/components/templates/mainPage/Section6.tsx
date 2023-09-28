import { Box, Grid, Typography } from "@mui/material";

import section6BackgroundImage from '@/assets/images/landing/section6/section6BackgroundImage.png';
import section6Image from '@/assets/images/landing/section6/section6Image.png';
import theme from "@/assets/styles/theme";

function Section6() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            minHeight: 'calc(100% + 56px)',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundImage: `url(${section6BackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                            mb: '50px',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        p: '0',
                        boxSizing: 'border-box',
                        alignSelf: 'center',
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
                            color: theme.color.Blue_080,
                            fontSize: '18px',
                            fontWeight: '700',
                            lineHeight: '160%',

                        }}>
                            # 공유 보드
                        </Typography>
                        <Typography sx={{
                            fontSize: '28px',
                            fontWeight: '700',
                            lineHeight: '150%',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}>
                            나만의 보드를 만들고<br />
                            다른 사람과 나누세요
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={10}
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
                        },
                        alignSelf: 'center',
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
                        <img src={section6Image} alt="section3Image1" style={{
                            width: '100%',
                        }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Section6;
