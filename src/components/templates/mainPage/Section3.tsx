import section3Image1 from '@/assets/images/landing/section3/section3Image1.png';
import section3Image2 from '@/assets/images/landing/section3/section3Image2.png';
import theme from '@/assets/styles/theme';
import { Box, Grid } from '@mui/material';

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
                <Grid item xs={4} md={4}
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
                    <img src={section3Image1} alt="section3Image1" style={{
                        width: '100%',
                    }} />
                </Grid>
                <Grid item xs={8} md={8}
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
                    <img src={section3Image2} alt="section3Image2" style={{
                        width: '100%',
                    }} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Section3;
