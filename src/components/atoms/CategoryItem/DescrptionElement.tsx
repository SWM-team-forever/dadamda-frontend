import theme from "../../../assets/styles/theme";
import RowContainer from "../RowContainer";

import { decode } from 'html-entities';

const mobileVideoStyle = {
    color: theme.color.Gray_080,
    fontSize: '11px',
    fontWeight: '400',
    lineHeight: '160%',
    overflow: 'hidden',
}

const desktopVideoItemStyle = {
    color: theme.color.Gray_080,
    fontSize: '11px',
    fontWeight: '400',
    lineHeight: '160%',
    overflow: 'hidden',
}

const desktopArticleItemStyle = {
    color: theme.color.Gray_080,
    fontSize: '11px',
    fontWeight: '400',
    lineHeight: '160%',
    overflow: 'hidden',
}

const desktopArticleListStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const mobileArticleStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const scrapCardStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const siteNameStyles = {
    mobileVideo: mobileVideoStyle,
    desktopItemVideo: desktopVideoItemStyle,
    desktopArticleItem: desktopArticleItemStyle,
    desktopArticleList: desktopArticleListStyle,
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