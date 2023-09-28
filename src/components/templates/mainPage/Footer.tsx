import { Box, Typography, Link, Grid } from '@mui/material';

import theme from '@/assets/styles/theme';

const Footer = () => {
    const boldTextStyle = {
        color: theme.color.Gray_090,
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '140%',
        textAlign: 'center',
        wordBreak: 'keep-all',
    };

    const normalTextStyle = {
        color: theme.color.Gray_080,
        fontSize: '12px',
        fontWeight: '300',
        lineHeight: '166%',
        textAlign: 'center',
        wordBreak: 'keep-all',
    }

    return (
        <Box sx={{
            flexGrow: 1,
            background: theme.color.Gray_020,
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Grid container spacing={1} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                mt: '30px',
            }}>
                <Grid item xs={12} sm={7}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                sm: 'row',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                ...boldTextStyle,
                                mr: {
                                    xs: '0',
                                    sm: '50px',
                                },
                                mb: {
                                    xs: '10px',
                                    sm: '0',
                                },
                                whiteSpace: 'nowrap',
                            }}
                        >
                            (주) 다담다
                        </Typography>
                        <Box>
                            <Typography
                                sx={{
                                    ...normalTextStyle,
                                    textAlign: {
                                        xs: 'center',
                                        sm: 'left',
                                    }
                                }}
                            >
                                서울특별시 강남구 테헤란로 311(역삼동) 아남타워빌딩 7층(06151)
                            </Typography>
                            <Typography
                                sx={{
                                    ...normalTextStyle,
                                    textAlign: {
                                        xs: 'center',
                                        sm: 'left',
                                    }
                                }}
                            >
                                기업 또는 이용 문의: dadamda.corporation@gmail.com
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography
                        sx={{
                            ...boldTextStyle
                        }}
                    >
                        <Link href='/privacy' target="_blank" underline="none" style={{
                            textDecoration: 'none',
                            color: theme.color.text_gray_color,
                        }}>
                            개인 정보 처리 방침
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography
                        sx={{
                            ...normalTextStyle,
                            mb: '30px',
                            mt: {
                                xs: '24px',
                                sm: '30px',
                            }
                        }}
                    >
                        COPYRIGHT 2023 dadamda Co. All RIGHTS RESERVED.
                    </Typography>
                </Grid>
            </Grid>
        </Box >
    );
};

export default Footer;
