import { Box, Typography } from "@mui/material";
import { JSX } from "react/jsx-runtime";

import theme from "@/assets/styles/theme";
import { contentProps } from "@/types/ContentType";

import { ChannelElement } from "@/components/atoms/CategoryItem/ChannelElement";
import { PublishedDateElement } from "@/components/atoms/CategoryItem/PublishedDateElement";
import ProfileImage from "@/components/atoms/ProfileImage";

function ChannelInfo({ content }: { content: contentProps['content'] }) {
    const { channelImageUrl, channelName, publishedDate, author, blogName, authorImageUrl } = content;
    const varient = 'scrapCard';
    function ChannelInfoImage() {
        return (
            <>
                {channelImageUrl && <ProfileImage source={channelImageUrl} size={20} />}
                {authorImageUrl && <ProfileImage source={authorImageUrl} size={20} />}
            </>
        )
    }

    function dividerDot() {
        return (
            <Typography
                color={theme.color.Gray_080}
                variant="h6"
                sx={{
                    fontWeight: '300',
                    lineHeight: '160%',
                }}
            >
                {' • '}
            </Typography>
        );
    }

    function ChannelInfoText() {
        const channelInfoTextArray: JSX.Element[] = [];

        const channelInfoTextElementTypeArray = [channelName, author, blogName, publishedDate];
        channelInfoTextElementTypeArray.map((element) => {
            if (element) {
                channelInfoTextArray.push(element === publishedDate ? <PublishedDateElement publishedDate={element} varient={varient} /> : <ChannelElement channelName={element} varient={varient} />);
            }
        });

        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '2px',
                }}
            >
                {channelInfoTextArray.map((element, index) => {
                    return (
                        <>
                            {element}
                            {index !== channelInfoTextArray.length - 1 && dividerDot()}
                        </>
                    )
                })}
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '8px',
            }}
        >
            <ChannelInfoImage />
            <ChannelInfoText />
        </Box>
    );
}

export default ChannelInfo;
