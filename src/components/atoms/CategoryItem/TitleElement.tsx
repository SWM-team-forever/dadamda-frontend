import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";


const mobileProductStyle = {
    fontSize: '0.875rem',
    lineHeight: '120%',
    color: theme.color.text_gray_color,
    fontWeight: '700',
}

const desktopProductItemStyle = {
    fontSize: '1.25rem',
    lineHeight: '120%',
    fontWeight: '700',
    color: theme.color.text_gray_color,
}

const desktopProductListStyle = {
    fontSize: '0.9375rem',
    lineHeight: '120%',
    fontWeight: '400',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const mobileVideoStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1.25rem',
    fontWeight: '400',
    lineHeight: '120%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopVideoItemStyle = {

}

const desktopVideoListStyle = {
    fontSize: '0.75rem',
    lineHeight: '120%',
    fontWeight: '400',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
    color: theme.color.text_gray_color,
}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProductItem: desktopProductItemStyle,
    desktopProductList: desktopProductListStyle,
    mobileVideo: mobileVideoStyle,
    desktopVideoList: desktopVideoListStyle,
    desktopVideoItem: desktopVideoItemStyle,
}


export function TitleElement({ title, varient }) {
    return (
        <Typography
            sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {title}
        </Typography>
    )
}