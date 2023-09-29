import { Box, Button, Grid, Typography } from "@mui/material";

import theme from "@/assets/styles/theme";

function Section7() {
    const boldFontStyle = {
        fontSize: '32px',
        fontWeight: '700',
        lineHeight: '160%',
        color: 'white',
        wordBreak: 'keep-all',
        textAlign: 'center',
    };

    const chromeExtensionInstallLink = 'https://chrome.google.com/webstore/detail/dadamda/kgaiabolccidmgihificdfaimdlfmcfj?hl=ko';
    const moveToChromeExtensionInstallLinkHandler = () => {
        location.href = chromeExtensionInstallLink;
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100% + 56px)',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxSizing: 'border-box',
                backgroundColor: '#3478FE',
            }}
        >
            <Grid container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '1300px',
                    boxSizing: 'border-box',
                    m: '100px 0',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                <Grid item xs={12} sm={5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <Typography sx={boldFontStyle}>
                            지금
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
                                    ...boldFontStyle,
                                    color: 'white',
                                    transform: 'scale(0.8)',
                                }}>
                                다담아
                            </Typography>
                        </Box>
                        <Typography sx={boldFontStyle}>
                            보세요!
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: '18px',
                            fontWeight: '400',
                            lineHeight: '160%',
                            color: 'white',
                            wordBreak: 'keep-all',
                        }}
                    >
                        번거롭게 앱 다운할 필요 없이<br />
                        크롬 확장 프로그램 설치만 하면 끝.
                    </Typography>
                    <Button
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '40px',
                            color: '#0C66E4',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                        onClick={moveToChromeExtensionInstallLinkHandler}
                    >
                        다담다 무료 설치
                    </Button>
                </Grid>
            </Grid >
        </Box>
    );
}

export default Section7;
