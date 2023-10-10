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
                position: 'fixed',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    left: '0',
                    width: {
                        xs: '100%',
                        sm: 'calc(100% - 100px)',
                    },
                    height: '100%',
                    overflow: 'auto',
                    pb: '100px',
                    boxSizing: 'border-box',
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
                </Box>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                    flexDirection: 'column',
                    position: 'fixed',
                    right: '0',
                    width: '100px',
                    height: '100%',
                    gap: '16px',
                    mt: '30px',
                }}
            >
                <Button
                    onClick={() => openModal('scrapCreateOnBoard')}
                >
                    스크랩 추가
                </Button>
                <Button
                    onClick={() => openModal('stickerPaste')}
                >
                    스티커 추가
                </Button>
                <Button>
                    편집 모드
                </Button>
                <Button>
                    저장
                </Button>
                <Button>
                    공유
                </Button>
                <Button>
                    설정
                </Button>
            </Box>
        </Box>
    );
}

export default BoardInfoPage;
