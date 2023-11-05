import CopyBoardButton from "@/components/atoms/Board/CopyBoardButton";
import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { Box, Typography } from "@mui/material";

function BoardPublicModalElement() {
    const { board } = useBoardAtom();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Box
                sx={{
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
                        {board.title}
                    </Typography>
                    <CopyBoardButton boardId={board.boardUUID} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <TrashableItems confirmDrop={false} mode={'view'} isBoardShared={true} />
                </Box>
            </Box>
        </Box>
    );
}

export default BoardPublicModalElement;
