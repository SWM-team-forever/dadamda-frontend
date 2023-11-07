import theme from "@/assets/styles/theme";
import BoardGuideButton from "@/components/atoms/Board/BoardGuideButton";
import CreateBoardButton from "@/components/atoms/Board/CreateBoardButton";
import { EmptyBoardIcon } from "@/components/atoms/Icon";
import { Box, Typography } from "@mui/material";

function EmptyTrendingContainer() {
    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
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
                    트렌딩에 게시된 보드가 없습니다.
                </Typography>
            </Box>
        </Box>
    )
}

export default EmptyTrendingContainer;
