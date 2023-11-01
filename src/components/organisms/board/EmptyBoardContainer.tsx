import { Box, Typography } from "@mui/material";

import { EmptyBoardIcon } from "@/components/atoms/Icon";
import CreateBoardButton from "@/components/atoms/Board/CreateBoardButton";
import theme from "@/assets/styles/theme";
import BoardGuideButton from "@/components/atoms/Board/BoardGuideButton";

function EmptyBoardContainer() {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            <EmptyBoardIcon width="86" height="78" />
            <Typography
                variant="h1"
                fontWeight="600"
                color={theme.color.Gray_090}
            >
                보드를 추가해주세요!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                }}
            >
                <CreateBoardButton />
                <BoardGuideButton />
            </Box>
        </Box>
    );
}

export default EmptyBoardContainer;
