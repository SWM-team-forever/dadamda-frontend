const theme = {
    color: {
        background_color: '#EFF1F3',
        primary_color: '#154FEF',
        secondary_color: 'rgba(179, 212, 255, 0.5)',
        text_gray_color: '#44546F',
        selected_gray_color: 'rgba(68, 84, 111, 0.1)',
        icon_color: '#626F86',
        primary_opacity_color: 'rgba(21, 79, 239, 0.8)',
        secondary_text_gray_color: '#101828',
        Blue_090: '#1B5BBA',
        Blue_080: '#155EEF',
        Blue_070: '#AAC6F4',
        Blue_060: '#DAE6FF',
        Blue_050: '#F3F7FE',
        Blue_dry: '#415980',
        Gray_090: '#202C3F',
        Gray_080: '#667085',
        Gray_070: '#94A0B3',
        Gray_060: '#AFBBCC',
        Gray_050: '#C3CDDA',
        Gray_040: '#DFE4EB',
        Gray_030: '#EBEEF3',
        Gray_020: '#F5F7FA',
    },
    media: {
        small: 479,
        medium: 639,
        large: 1023,
    },
    style: {
        shadow: '0px 12px 16px -4px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.03)',
    },
    size: {
        s1: 12,
        s2: 14,
        s3: 16,
        m1: 20,
        m2: 24,
        m3: 28,
        l1: 32,
        l2: 40,
        l3: 48,
    },
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${theme.media.small})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};

export default theme;