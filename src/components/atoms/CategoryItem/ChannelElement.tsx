import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";

const desktopVideoListStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const desktopVideoItemStyle = {
    color: theme.color.Gray_080,
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const mobileVideoStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const scrapCardStyle = {
    color: theme.color.Gray_080,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '160%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
}

const channelStyles = {
    desktopVideoList: desktopVideoListStyle,
    desktopVideoItem: desktopVideoItemStyle,
    mobileVideo: mobileVideoStyle,
    scrapCard: scrapCardStyle,
}

export function ChannelElement({ channelName, varient }: any) {
    return (
        <Typography sx={channelStyles[varient as keyof typeof channelStyles]}>{channelName}</Typography>
    );
}