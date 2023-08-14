import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const mobileProductStyle = {
    fontSize: '0.75rem',
    wordBreak: 'break-all',
    color: theme.color.text_gray_color,
    fontWeight: '400',
}

const desktopProductListStyle = {
    fontSize: '0.75rem',
    wordBreak: 'break-all',
    color: theme.color.text_gray_color,
    fontWeight: '400',
}

const desktopProductItemStyle = {
    fontSize: '0.75rem',
    wordBreak: 'break-all',
    color: theme.color.text_gray_color,
    fontWeight: '400',
}

const mobileVideoStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const desktopVideoStyle = {

}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProductItem: desktopProductItemStyle,
    desktopProductList: desktopProductListStyle,
    mobileVideo: mobileVideoStyle,
    desktopVideo: desktopVideoStyle,
}

export function SiteNameElement({ siteName, varient }) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {siteName}
        </Typography>
    )
}
