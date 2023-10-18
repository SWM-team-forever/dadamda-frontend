import { useGetBoard } from "@/api/board";
import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";

function OpenBoardPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId(): string | null {
        return searchParams.get('boardUUID');
    }

    const { board, setBoard } = useBoardAtom();
    const boardPageId = getBoardPageId();

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
                    width: '100%',
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
                {boardPageId && <TrashableItems confirmDrop={false} mode={'view'} />}
            </Box>
        </Box >
    );
}

export default OpenBoardPage;
