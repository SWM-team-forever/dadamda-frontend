import sectionBlueGradationBackground from '@/assets/images/landing/section4/sectionBlueGradationBackground.png';
import section5Image from '@/assets/images/landing/section4/section5Image.png';
import leftHereTooltip from '@/assets/images/landing/section4/leftHereTooltip.png';
import theme from '@/assets/styles/theme';
import { Box, Grid, Typography } from '@mui/material';

function Section4() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            maxHeight: 'calc(100% + 56px)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundImage: `url(${sectionBlueGradationBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    maxWidth: '1300px',
                    boxSizing: 'border-box',
                    m: '0',
                    justifyContent: 'space-around',
                }}
            >
                <Grid item xs={10} sm={10}
                    sx={{
                        '&.MuiGrid-item': {
                            m: {
                                xs: '80px 40px 60px 0',
                                sm: '120px 120px 20px 0',
                            },
                            boxSizing: 'border-box',
                        },
                        alignSelf: 'flex-end',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            gap: '15px',
                            p: '0',
                        }}
                    >
                        <Typography sx={{
                            color: theme.color.Blue_080,
                            fontSize: '18px',
                            fontWeight: '700',
                            lineHeight: '160%',
                        }}>
                            # 도움이 되는 메모
                        </Typography>
                        <Typography sx={{
                            fontSize: '28px',
                            fontWeight: '700',
                            lineHeight: '150%',
                            wordBreak: 'keep-all',
                        }}>
                            메모를 남길 수도 있어요.<br />
                            기록으로 기억하세요.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={10} sm={7}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                        },
                        alignSelf: 'flex-start'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            transform: {
                                xs: 'translateX(-25%)',
                                sm: 'none',
                            },
                        }}
                    >
                        <img src={section5Image} alt="section4Image" style={{
                            width: '100%',
                        }} />
                        <img src={leftHereTooltip} alt="rightHereTooltip" style={{
                            width: '75px',
                        }} />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Section4;
