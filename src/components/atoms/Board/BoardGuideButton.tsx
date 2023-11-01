import theme from "@/assets/styles/theme";
import { BoardGuideIcon } from "@/components/atoms/Icon";
import { Button } from "@mui/material";

function BoardGuideButton() {
    const BOARD_GUIDE_LINK = 'https://gapyeong.notion.site/DADAMDA-c31a77d5d49f49898d965ee7e705442a?pvs=4';
    const handleOpenBoardGuide = () => {
        window.open(BOARD_GUIDE_LINK, '_blank');
    }

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
