import sectionBlueGradationBackground from '@/assets/images/landing/section4/sectionBlueGradationBackground.png';
import theme from '@/assets/styles/theme';
import { Box, Grid, Typography } from '@mui/material';

function Section4() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: 'calc(100% + 56px)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundImage: `url(${sectionBlueGradationBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Grid container spacing={{
                xs: '0',
                md: '6',
            }} sx={{
                display: 'flex',
                alignItems: 'flex-start',
                maxWidth: '1300px',
                boxSizing: 'border-box',
                m: '0',
                justifyContent: 'space-around',
            }}>
                <Grid item xs={10} sm={5}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                            mb: '50px',
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
                            width: '80%',
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
                        }}>
                            컨텐츠의 정보를<br />
                            번거롭게 작성할 필요 없어요.<br />
                            그저 저장만 하세요.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={10} sm={5}
                    sx={{
                        '&.MuiGrid-item': {
                            p: '0',
                        },
                    }}
                >
                    <Box>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Section4;
