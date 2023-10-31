import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useGetOpenBoardTitle } from "@/api/board";

import { TrashableItems } from "@/components/templates/TrashableItems";

function OpenBoardPage() {
    const params = useParams();

    function getBoardPageId(): string | null {
        return params['boardUUID'] || null;
    }

    const boardPageId = getBoardPageId();

    const { title, isTitleLoading } = useGetOpenBoardTitle(boardPageId);

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
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '24px',
                            fontWeight: '500',
                            m: '20px',
                        }}
                    >
                        {title}
                    </Typography>
                    <TrashableItems confirmDrop={false} mode={'view'} isBoardShared={true} />
                </Box>
            </Box >
        </>
    );
}

export default OpenBoardPage;
