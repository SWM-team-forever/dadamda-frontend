import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import ProfileImage from "../ProfileImage";

const desktopArticleListStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const desktopArticleItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '1rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
    desktopArticleItem: desktopArticleItemStyle,
}

export function AuthorElement({ author, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{author}</Typography>
    );
}
