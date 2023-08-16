import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import ProfileImage from "../ProfileImage";

const desktopArticleListStyle = {

}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
}

export function AuthorElement({ author, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{author}</Typography>
    );
}
