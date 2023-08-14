import { Typography } from "@mui/material";
import ProfileImage from "../ProfileImage";
import RowContainer from "../RowContainer";

export function ChannelElement({ channelImageUrl, channelName }) {
    return (
        <RowContainer
            style={{
                gap: '10px',
            }}>
            {channelImageUrl && <ProfileImage size={24} source={channelImageUrl} />}
            <Typography>{channelName}</Typography>
        </RowContainer>
    )
}