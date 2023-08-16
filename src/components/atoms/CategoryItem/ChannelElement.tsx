import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const mobileVideoStyle = {

}

const desktopVideoItemStyle = {

}

const desktopVideoListStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.625rem',
    fontWeight: '400',
    lineHeight: '100%',
}

const siteNameStyles = {
    mobileVideo: mobileVideoStyle,
    desktopVideoItem: desktopVideoItemStyle,
    desktopVideoList: desktopVideoListStyle,
}

export function ChannelElement({ channelName, varient }: any) {
    return (
        <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{channelName}</Typography>
    );
}