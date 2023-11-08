import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useGetOpenBoardTitle } from "@/api/board";

import { TrashableItems } from "@/components/templates/TrashableItems";
import CopyBoardButton from "@/components/atoms/Board/CopyBoardButton";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useEffect } from "react";
import { useIncreaseTrendingViewCount } from "@/api/trend";
import { logEvent } from "@/utility/amplitude";

function OpenBoardPage() {
    const params = useParams();

    function getBoardPageId(): string | null {
        return params['boardUUID'] || null;
    }

    const boardPageId = getBoardPageId();

    const { title, isTitleLoading } = useGetOpenBoardTitle(boardPageId);

    const { setBoard } = useBoardAtom();
    useEffect(() => {
        setBoard((prev) => ({
            ...prev,
            type: 'shared',
        }))
        handleIncreaeViewCount();
    }, [])

    const { mutate } = useIncreaseTrendingViewCount();

    const handleIncreaeViewCount = () => {
        if (getBoardPageId()) {
            mutate(getBoardPageId());
        }
        logEvent('view_open_board_click');
    }

    if (isTitleLoading) {
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
        <>
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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '24px',
                                fontWeight: '500',
                                m: '20px 0 20px 20px',
                            }}
                        >
                            {title}
                        </Typography>
                        <CopyBoardButton boardId={getBoardPageId()} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <TrashableItems confirmDrop={false} mode={'view'} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default OpenBoardPage;
