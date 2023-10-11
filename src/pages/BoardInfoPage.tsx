import { useGetBoard } from "@/api/board";
import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { Box, Button, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";

function BoardInfoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId(): string | null {
        return searchParams.get('boardId');
    }

    const { board, setBoard } = useBoardAtom();
    const boardPageId = getBoardPageId();

    useLayoutEffect(() => {
        async function fetchBoardInfo() {
            if (boardPageId === null) {
                return;
            }
            let boardInfo = await useGetBoard(boardPageId.toString());
            boardInfo = {
                ...boardInfo,
                data: {
                    ...boardInfo.data,
                    title: boardInfo.data.name,
                }
            }
            setBoard((prev) => ({
                ...prev,
                boardId: boardPageId,
                ...boardInfo.data,
            }))
        }

        fetchBoardInfo();
    }, [boardPageId, setBoard, board])

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
                <Button
                    onClick={() => openModal('boardEdit')}
                >
                    설정
                </Button>
            </Box>
        </Box >
    );
}

export default BoardInfoPage;
