import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { Box, Button, Typography } from "@mui/material";
import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";

function BoardInfoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId() {
        return searchParams.get('boardId');
    }

    function getTitle() {
        return searchParams.get('title');
    }

    const { board, setBoard } = useBoardAtom();
    const boardPageId = getBoardPageId();
    const boardTitle = getTitle();

    useLayoutEffect(() => {
        (boardTitle && boardPageId) && setBoard({
            ...board,
            title: boardTitle,
            boardId: boardPageId,
        });
    }, [])

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
                sx={{
                    fontSize: '24px',
                    fontWeight: '500',
                    m: '20px',
                }}
            >
                {board.title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {boardPageId && <TrashableItems confirmDrop={false} />}
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
