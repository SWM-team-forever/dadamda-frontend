import theme from "@/assets/styles/theme";
import { Box, Grid, Typography, Button } from "@mui/material";

import section1Image from "@/assets/images/landing/section1/section1Image.png";
import section1Text1 from "@/assets/images/landing/section1/section1Text1.png";
import section1Text2 from "@/assets/images/landing/section1/section1Text2.png";

function Section1() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            minHeight: 'calc(100% + 56px)',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            overflow: 'hidden',
            p: {
                xs: '20px',
                sm: '50px',
            },
            boxSizing: 'border-box',
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
                        <img src={section1Text1} alt="section1Text1" style={{
                            width: '100%',
                        }} />
                        <img src={section1Text2} alt="section1Text2" style={{
                            width: '50%',
                        }} />
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
                        <img src={section1Image} alt="section1Image" style={{
                            width: '100%',
                        }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Section1;
