import theme from "@/assets/styles/theme";
import { BoardGuideIcon } from "@/components/atoms/Icon";
import { useMoveToBoardGuideLink } from "@/hooks/useCustomNavigation";
import { Button } from "@mui/material";

function BoardGuideButton() {
    const handleOpenBoardGuide = useMoveToBoardGuideLink;

    return (
        <Button
            variant="contained"
            sx={{
                color: theme.color.Gray_080,
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: theme.color.Gray_020,
                },
            }}
            startIcon={<BoardGuideIcon width="12" height="12" fill={theme.color.Gray_080} />}
            onClick={handleOpenBoardGuide}
        >
            보드 이용 가이드
        </Button>
    );
}

export default BoardGuideButton;
