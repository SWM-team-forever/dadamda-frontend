import { Box } from "@mui/material";

import theme from "@/assets/styles/theme";

import { ProfileIcon } from "@/components/atoms/Icon";

function DefaultBoardThumbnail() {
    return (
        <Box
            sx={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: theme.color.Blue_090,
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.color.Blue_080,
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ProfileIcon size='80' />
        </Box>
    );
}

export default DefaultBoardThumbnail;
