import { Box } from "@mui/material";

import { DefaultBoardThumbnailIcon } from "@/components/atoms/Icon";

function DefaultBoardThumbnail({ ...props }) {
    return (
        <Box
            sx={{
                width: '100%',
                p: '29px 0',
                backgroundColor: '#7DACFA',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...props.sx,
            }}
        >
            <DefaultBoardThumbnailIcon width="138" height="122" />
        </Box>
    );
}

export default DefaultBoardThumbnail;
