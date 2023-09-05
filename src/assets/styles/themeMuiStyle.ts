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
                        fontSize: '22pt',
                        lineHeight: '160%',
                    }
                },
                {
                    props: {variant: 'h2'},
                    style: {
                        fontSize: '18pt',
                        lineHeight: '160%',
                    }
                },
                {
                    props: {variant: 'h3'},
                    style: {
                        fontSize: '16pt',
                        lineHeight: '150%',
                    }
                },
                {
                    props: {variant: 'h4'},
                    style: {
                        fontSize: '14pt',
                        lineHeihgt: '150%',
                    }
                },
                {
                    props: {variant: 'h5'},
                    style: {
                        fontSize: '13pt',
                        lineHeihgt: '150%',
                    }
                },
                 {
                    props: {variant: 'h6'},
                    style: {
                        fontSize: '12pt',
                        lineHeihgt: '150%',
                    }
                }
            ]
        }
    }
});

export default theme;
