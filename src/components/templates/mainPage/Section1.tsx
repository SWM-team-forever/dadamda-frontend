import theme from "@/assets/styles/theme";
import { Box, Grid, Typography, Button } from "@mui/material";

function Section1() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            minHeight: '600px',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Grid container spacing={6} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1300px',
                padding: '50px',
            }}>
                <Grid item xs={12} md={5}>
                    <Box
                        sx={{
                            backgroundColor: theme.color.Blue_090
                        }}
                    >
                        left
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box
                        sx={{
                            backgroundColor: theme.color.Gray_090
                        }}
                    >
                        right
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Section1;
