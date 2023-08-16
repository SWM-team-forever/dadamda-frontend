import theme from "../../../assets/styles/theme";
import RowContainer from "../RowContainer";

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

const siteNameStyles = {
    mobileVideo: mobileVideoStyle,
    desktopItemVideo: desktopVideoItemStyle,
    desktopArticleItem: desktopArticleItemStyle,
}

export function DescriptionElement({ description, varient }: any) {
    return (
        <RowContainer
            style={siteNameStyles[varient as keyof typeof siteNameStyles]}>
            {description}
        </RowContainer>
    )
}