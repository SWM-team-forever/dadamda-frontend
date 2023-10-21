import { useGetBoardIsShared, useGetOpenBoardTitle } from "@/api/board";
import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";

function OpenBoardPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setBoard } = useBoardAtom();

    function getBoardPageId(): string | null {
        return searchParams.get('boardUUID');
    }

    const boardPageId = getBoardPageId();

    const { isBoardShared, isLoadingGetIsBoardShared } = useGetBoardIsShared(boardPageId);
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        ['boardTitle', boardPageId],
        () => boardPageId && useGetOpenBoardTitle(boardPageId.toString()),
        {
            enabled: !!boardPageId,
            onSuccess: (data) => {
                if (data) {
                    setBoard((prev) => ({
                        ...prev,
                        boardUUID: boardPageId,
                    }))
                }
            },
            onError: () => {
                useDefaultSnackbar('존재하지 않거나 권한이 없는 보드입니다.', 'error');
                navigate('not-found');
            },
            select: (data) => {
                return data?.data.title;
            },
            retry: false,
            useErrorBoundary: (error: Error) => error.message !== "NF005",
        }
    )

    if (isLoadingGetIsBoardShared || isLoading) {
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

    if (!isBoardShared) {
        navigate('/not-found');
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
                    {data}
                </Typography>
                {boardPageId && <TrashableItems confirmDrop={false} mode={'view'} isBoardShared={isBoardShared} />}
            </Box>
        </Box >
    );
}

export default OpenBoardPage;
