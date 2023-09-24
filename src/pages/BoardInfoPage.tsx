import BoardTemplate from "@/components/templates/BoardTemplate";
import { useModal } from "@/hooks/useModal";
import { Box, Button, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function BoardInfoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId() {
        return searchParams.get('boardId');
    }

    const { openModal } = useModal();

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100% - 56px)',
            }}
        >
            <Typography
                variant="h1"
            >
                보드 {getBoardPageId()}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <BoardTemplate />
                <Box>
                    <Button
                        onClick={() => openModal('scrapCreateOnBoard')}
                    >
                        스크랩 추가
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardInfoPage;
