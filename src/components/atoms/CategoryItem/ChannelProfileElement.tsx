import { Typography } from "@mui/material";
import ProfileImage from "../ProfileImage";
import RowContainer from "../RowContainer";
import theme from "../../../assets/styles/theme";

const mobileVideoStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '160%',
}

const desktopVideoItemStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const scrapCardStyle = {
    color: theme.color.text_gray_color,
    fontSize: '0.875rem',
    fontWeight: '400',
    fontHeight: '160%',
}

const siteNameStyles = {
    mobileVideo: mobileVideoStyle,
    desktopItemVideo: desktopVideoItemStyle,
    scrapCard: scrapCardStyle,
}

export function ChannelProfileElement({ channelImageUrl, channelName, varient }: any) {
    return (
        <RowContainer
            style={{
                gap: '10px',
            }}>
            {channelImageUrl && <ProfileImage size={24} source={channelImageUrl} />}
            <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>{channelName}</Typography>
        </RowContainer>
    )
}
