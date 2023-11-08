import theme from "@/assets/styles/theme";
import CopyBoardButton from "@/components/atoms/Board/CopyBoardButton";
import { CloseIcon } from "@/components/atoms/Icon";
import { TrashableItems } from "@/components/templates/TrashableItems";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { Box, Button, Typography } from "@mui/material";

function BoardPublicModalElement() {
    const { board } = useBoardAtom();
    const { closeModal } = useModal();

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
                        justifyContent: 'space-between',
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
                    <Button
                        startIcon={<CloseIcon width='20' height='20' fill={theme.color.Gray_080} />}
                        onClick={closeModal}
                    />
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
    );
}

export default BoardPublicModalElement;
