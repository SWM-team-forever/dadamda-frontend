import { Typography } from "@mui/material";
import { getTimeDiff } from "../../../hooks/useCalculateDateDiff";
import theme from "../../../assets/styles/theme";

const desktopArticleListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '160%',
};

const desktopArticleItemStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '160%',
}

const mobileArticleStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const desktopVideoListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '160%',
}

const mobileVideoStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '160%',
}

const scrapCardStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '160%',
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
    desktopVideoList: desktopVideoListStyle,
    mobileVideo: mobileVideoStyle,
    scrapCard: scrapCardStyle,
}

export function PublishedDateElement({ publishedDate, varient }: any) {

    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{getTimeDiff(publishedDate)}</Typography>
    )
}
