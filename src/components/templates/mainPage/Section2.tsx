import { Box, Grid, Typography } from "@mui/material";

function Section2() {
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
                <Typography variant="h4" component="h2" sx={{}}>
                    이제, 다담다로 북마크의 신세계를 경험하세요
                </Typography>
            </Grid>
        </Box>
    );
}

export default Section2;
