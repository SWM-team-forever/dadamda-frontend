import { Box, Typography } from "@mui/material";

import { EmptyBoardIcon } from "@/components/atoms/Icon";
import CreateBoardButton from "@/components/atoms/Board/CreateBoardButton";

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
            <Typography>보드를 추가해주세요!</Typography>
            <CreateBoardButton />
        </Box>
    );
}

export default EmptyBoardContainer;
