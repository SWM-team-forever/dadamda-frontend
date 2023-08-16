import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const desktopArticleListStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    lineHeight: '100%',
}

const desktopArticleItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    lineHeight: '100%',
}

const mobileArticleStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
}

export function BlogNameElement({ blogName, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{blogName}</Typography>
    );
}