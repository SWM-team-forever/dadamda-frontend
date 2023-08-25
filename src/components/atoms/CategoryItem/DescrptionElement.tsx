import theme from "../../../assets/styles/theme";
import RowContainer from "../RowContainer";

import { decode } from 'html-entities';

const mobileVideoStyle = {
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const desktopVideoItemStyle = {
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const desktopArticleItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '160%',
    width: '100%',
}

const mobileArticleStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '160%',
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
}

const scrapCardStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const siteNameStyles = {
    mobileVideo: mobileVideoStyle,
    desktopItemVideo: desktopVideoItemStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
    scrapCard: scrapCardStyle,
}

export function DescriptionElement({ description, varient }: any) {
    description = decode(description, { level: 'html5' });
    return (
        <RowContainer
            style={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {description}
        </RowContainer>
    )
}