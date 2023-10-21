import { useGetBoard } from "@/api/board";
import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { useBoardContentAtom } from "@/hooks/useBoardContentAtom";
import { useRef, useState } from "react";

function BoardInfoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId(): string | null {
        return searchParams.get('boardUUID');
    }

    const { board, setBoard } = useBoardAtom();
    const boardPageId = getBoardPageId();

    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const isViewerMode = (mode: string) => mode === 'view';
    const isEditMode = (mode: string) => mode === 'edit';

    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        ['board', boardPageId],
        () => boardPageId && useGetBoard(boardPageId.toString()),
        {
            enabled: !!boardPageId,
            onSuccess: (data) => {
                if (data) {
                    setBoard((prev) => ({
                        ...prev,
                        boardUUID: boardPageId,
                        ...data.data,
                    }))
                }
            },
            onError: () => {
                useDefaultSnackbar('존재하지 않거나 권한이 없는 보드입니다.', 'error');
                navigate('/board');
            },
            retry: false,
            useErrorBoundary: (error: Error) => error.message !== "NF005",
        }
    )

    const { openModal } = useModal();
    const { handleSaveBoard } = useBoardContentAtom();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 'calc(100% - 56px)',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '24px',
                        fontWeight: '500',
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        )
    }


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
                    {boardPageId &&
                        <TrashableItems
                            confirmDrop={false}
                            mode={mode}
                        />
                    }
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
                    disabled={isViewerMode(mode)}
                >
                    스크랩 추가
                </Button>
                <Button
                    onClick={() => openModal('stickerPaste')}
                    disabled={isViewerMode(mode)}
                >
                    스티커 추가
                </Button>
                {isViewerMode(mode) ? (
                    <Button
                        onClick={() => setMode('edit')}
                    >
                        편집 모드
                    </Button>
                )
                    : (
                        <Button
                            onClick={() => {
                                setMode('view')
                                handleSaveBoard('edit')
                            }}
                        >
                            보기 모드
                        </Button>
                    )
                }
                <Button
                    onClick={() => {
                        setMode('view')
                        handleSaveBoard('edit')
                    }}
                >
                    저장
                </Button>
                {/* <Button
                    onClick={() => openModal('boardShare')}
                >
                    공유
                </Button> */}
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
