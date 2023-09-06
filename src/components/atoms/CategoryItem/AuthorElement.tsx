import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const desktopArticleListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopArticleItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const mobileArticleStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const scrapCardStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
    scrapCard: scrapCardStyle,
}

export function AuthorElement({ author, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{author}</Typography>
    );
}
