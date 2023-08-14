import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const mobileProductStyle = {
    fontSize: '0.75rem',
    wordBreak: 'break-all',
    color: theme.color.text_gray_color,
}

const desktopProductListStyle = {

}

const desktopProductItemStyle = {

}

const mobileVideoStyle = {

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
