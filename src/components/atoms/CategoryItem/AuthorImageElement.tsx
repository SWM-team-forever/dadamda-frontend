import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import ProfileImage from "../ProfileImage";

const desktopArticleListStyle = {
    size: 30,
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
}

export function AuthorImageElement({ authorImage, varient }: any) {
    return (
        <ProfileImage size={30} source={authorImage} />
    );
}
