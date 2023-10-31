import { useCopyOpenBoard } from "@/api/board";
import theme from "@/assets/styles/theme";
import { PasteIcon } from "@/components/atoms/Icon";
import { Box, Tooltip, Typography } from "@mui/material";

function PasteBoardButton({ boardId }: { boardId: string | null }) {
    const { mutate } = useCopyOpenBoard(boardId);

    return (
        <Tooltip
            title={
                <>
                    <b>내 보드에 담기</b>를 선택하시면,
                    <br />
                    보드가 복사되어 내 보드에 저장됩니다.
                </>
            }
        >
            <Box
                sx={{
                    display: 'flex',
                    color: theme.color.Gray_070,
                    gap: '5px',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={() => mutate(boardId)}
            >
                <PasteIcon width="20" height="20" fill={theme.color.Gray_070} />
                <Typography variant="h5">내 보드에 담기</Typography>
            </Box>
        </Tooltip>
    );
}

export default PasteBoardButton;
