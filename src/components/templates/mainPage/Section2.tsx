import theme from "@/assets/styles/theme";
import { Box, Grid, Typography } from "@mui/material";

function Section2() {
    const fontStyle = {
        fontSize: '32px',
        fontWeight: '700',
        lineHeight: '160%',
        color: theme.color.Gray_090,
    };

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
            <Grid container
                spacing={{
                    xs: '0',
                    md: '6',
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '1300px',
                    boxSizing: 'border-box',
                    m: '0',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                <Typography sx={fontStyle}>
                    이제,
                </Typography>
                <Box
                    sx={{
                        backgroundColor: theme.color.Blue_080,
                        borderRadius: '100%',
                        aspectRatio: '1/1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'scale(1.2)',
                    }}
                >
                    <Typography
                        sx={{
                            ...fontStyle,
                            color: 'white',
                            transform: 'scale(0.8)',
                        }}>
                        다담다
                    </Typography>
                </Box>
                <Typography sx={fontStyle}>
                    로 북마크의 신세계를 경험하세요
                </Typography>
            </Grid >
        </Box >
    );
}

export default Section2;
