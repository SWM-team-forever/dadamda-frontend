import sectionBlueGradationBackground from '@/assets/images/landing/section4/sectionBlueGradationBackground.png';
import section4Image from '@/assets/images/landing/section4/section4Image.png';
import rightHereTooltip from '@/assets/images/landing/section4/rightHereTooltip.png';
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
                                xs: '80px 0 60px 40px',
                                sm: '120px 0 0 120px',
                            },
                            boxSizing: 'border-box',
                        },
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
                            # 자동 컨텐츠 맞춤 정보 추출
                        </Typography>
                        <Typography sx={{
                            fontSize: '28px',
                            fontWeight: '700',
                            lineHeight: '150%',
                            wordBreak: 'keep-all',
                        }}>
                            컨텐츠의 정보를<br />
                            번거롭게 작성할 필요 없어요.<br />
                            그저 저장만 하세요.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={10} sm={7}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                        },
                        alignSelf: 'flex-end'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img src={rightHereTooltip} alt="rightHereTooltip" style={{
                            width: '75px',
                        }} />
                        <img src={section4Image} alt="section4Image" style={{
                            width: '100%',
                        }} />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Section4;
