import { Typography } from "@mui/material";
import { getTimeDiff } from "../../../hooks/useCalculateDateDiff";
import ColumnContainer from "../ColumnContainer";
import RowContainer from "../RowContainer";
import theme from "../../../assets/styles/theme";

const desktopArticleListStyle = {
    alignItems: 'center',
    flex: '1',
    fontHeight: '160%',
    color: theme.color.text_gray_color,
};

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
}

export function PublishedDateElement({ publishedDate, varient }: any) {

    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{getTimeDiff(publishedDate)}</Typography>
    )
}
