import theme from "@/assets/styles/theme";
import { BoardGuideIcon } from "@/components/atoms/Icon";
import { Button } from "@mui/material";

function BoardGuideButton() {
    return (
        <Button
            variant="contained"
            sx={{
                color: theme.color.Gray_080,
                backgroundColor: 'white',
            }}
            startIcon={<BoardGuideIcon width="12" height="12" fill={theme.color.Gray_080} />}
        >
            보드 이용 가이드
        </Button>
    );
}

export default BoardGuideButton;
