import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const desktopArticleListStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    lineHeight: '100%',
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
}

export function BlogNameElement({ blogName, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{blogName}</Typography>
    );
}