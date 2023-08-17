import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import ProfileImage from "../ProfileImage";
import avatar from '../../../assets/images/Avatar.png';

const desktopArticleListStyle = {
    size: 30,
}

const siteNameStyles = {
    desktopArticleList: desktopArticleListStyle,
}

export function AuthorImageElement({ authorImage }: any) {
    return (
        <>
            {authorImage ? <ProfileImage size={30} source={authorImage} /> : <ProfileImage size={30} source={avatar} />}
        </>
    );
}
