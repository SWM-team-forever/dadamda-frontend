import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#154FEF',
            
        },
        text: {
            primary: '#44546F',
            secondary: '#101828',
        }
    },
    typography: {
        fontFamily: 'Pretendard',
    },
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {variant: 'h1'},
                    style: {
                        fontSize: '22px',
                        lineHeight: '160%',
                    }
                },
                {
                    props: {variant: 'h2'},
                    style: {
                        fontSize: '18px',
                        lineHeight: '160%',
                    }
                },
                {
                    props: {variant: 'h3'},
                    style: {
                        fontSize: '16px',
                        lineHeight: '150%',
                    }
                },
                {
                    props: {variant: 'h4'},
                    style: {
                        fontSize: '14px',
                        lineHeihgt: '150%',
                    }
                },
                {
                    props: {variant: 'h5'},
                    style: {
                        fontSize: '13px',
                        lineHeihgt: '150%',
                    }
                },
                 {
                    props: {variant: 'h6'},
                    style: {
                        fontSize: '12px',
                        lineHeihgt: '150%',
                    }
                }
            ]
        }
    }
});

export default theme;
