import { Typography } from "@mui/material";
import { getTimeDiff } from "../../../hooks/useCalculateDateDiff";
import ColumnContainer from "../ColumnContainer";
import RowContainer from "../RowContainer";
import theme from "../../../assets/styles/theme";

const desktopArticleListStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '160%',
};

const desktopArticleItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const mobileArticleStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
    mobileArticle: mobileArticleStyle,
}

export function PublishedDateElement({ publishedDate, varient }: any) {

    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{getTimeDiff(publishedDate)}</Typography>
    )
}
