import { Typography } from "@mui/material";

import theme from "../../../assets/styles/theme";

const mobileProductStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
}

const desktopProductListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
}

const desktopProductItemStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
}

const mobileVideoStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
}

const desktopVideoItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const desktopVideoListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
}

const desktopArticleItemStyle = {
    color: theme.color.primary_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const desktopArticleListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
}

const mobileArticleStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
}

const scrapCardStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '150%',
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
