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
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            overflow: 'hidden',
        }}>
            <Grid container spacing={6} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1300px',
                padding: '50px',
            }}>
                <Grid item xs={12} md={5}>
                    <Box>
                        <img src={section1Text1} alt="section1Text1" style={{
                            width: '100%',
                        }} />
                        <img src={section1Text2} alt="section1Text2" style={{
                            width: '100%',
                        }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box

                    >
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
