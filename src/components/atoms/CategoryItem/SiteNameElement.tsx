import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { SiWhitesource } from "react-icons/si";

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

const desktopVideoItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const desktopArticleItemStyle = {
    color: theme.color.primary_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const desktopArticleListStyle = {
    color: theme.color.primary_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const mobileArticleStyle = {
    color: theme.color.primary_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const scrapCardStyle = {
    borderRadius: '10px',
    padding: '0 10px',
    background: theme.color.primary_color,
    color: theme.color.background_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '160%',
    width: 'fit-content',
}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProductItem: desktopProductItemStyle,
    desktopProductList: desktopProductListStyle,
    mobileVideo: mobileVideoStyle,
    desktopItemVideo: desktopVideoItemStyle,
    desktopArticleItem: desktopArticleItemStyle,
    desktopArticleList: desktopArticleListStyle,
    mobileArticle: mobileArticleStyle,
    scrapCard: scrapCardStyle,
}

export function SiteNameElement({ siteName, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {siteName}
        </Typography>
    )
}
