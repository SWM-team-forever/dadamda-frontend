import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

import { decode } from 'html-entities';

const mobileProductStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopProductItemStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
}

const desktopProductListStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const mobileVideoStyle = {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopVideoItemStyle = {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '150%',
    color: theme.color.Gray_090,
}

const desktopVideoListStyle = {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopArticleListStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopArticleItemStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const mobileArticleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const scrapCardStyle = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProductItem: desktopProductItemStyle,
    desktopProductList: desktopProductListStyle,
    mobileVideo: mobileVideoStyle,
    desktopVideoList: desktopVideoListStyle,
    desktopVideoItem: desktopVideoItemStyle,
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
    scrapCard: scrapCardStyle,
}


export function TitleElement({ title, varient }: any) {
    title = decode(title, { level: 'html5' });

    return (
        <Typography
            sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {title}
        </Typography>
    )
}