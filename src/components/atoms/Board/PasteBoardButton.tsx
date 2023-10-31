import theme from "@/assets/styles/theme";
import { PasteIcon } from "@/components/atoms/Icon";
import { Box, Typography } from "@mui/material";

function PasteBoardButton() {
    return (
        <Box
            sx={{
                display: 'flex',
                color: theme.color.Gray_070,
                gap: '5px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    cursor: 'pointer',
                }}
            >
                <PasteIcon width="20" height="20" fill={theme.color.Gray_070} />
            </Box>
            <Typography variant="h5">내 보드에 담기</Typography>
        </Box>
    );
}

export default PasteBoardButton;
