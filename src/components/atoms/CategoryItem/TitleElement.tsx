import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";


const mobileProductStyle = {
    fontSize: '0.875rem',
    lineHeight: '120%',
    color: theme.color.text_gray_color,
}

const desktopProductStyle = {

}

const mobileVideoStyle = {

}

const desktopVideoStyle = {

}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProduct: desktopProductStyle,
    mobileVideo: mobileVideoStyle,
    desktopVideo: desktopVideoStyle,
}


export function TitleElement({ title, varient }) {
    return (
        <Typography
            sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {title}
        </Typography>
    )
}