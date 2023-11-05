import { useCopyOpenBoard } from "@/api/board";
import { logEvent } from "@amplitude/analytics-browser";
import { Box, Tooltip, Typography } from "@mui/material";

import { PasteIcon } from "@/components/atoms/Icon";

import theme from "@/assets/styles/theme";
import { useModal } from "@/hooks/useModal";

function CopyBoardButton({ boardId, isOnlyIcon }: { boardId: string | null, isOnlyIcon?: boolean }) {
    const { mutate } = useCopyOpenBoard();

    const { openModal } = useModal();
    const currentURL = window.location.href;
    function isTokenExist() {
        return localStorage.getItem('token') !== null;
    }

    const handleCopyBoard = () => {
        if (!isTokenExist()) {
            openModal('login', currentURL);
            return;
        }

        mutate(boardId);

        logEvent('copy_board_click');
    }

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
                onClick={handleCopyBoard}
            >
                <PasteIcon width={isOnlyIcon ? '14' : '20'} height={isOnlyIcon ? '14' : '20'} fill={theme.color.Gray_070} />
                {!isOnlyIcon && <Typography variant="h5">내 보드에 담기</Typography>}
            </Box>
        </Tooltip>
    );
}

export default CopyBoardButton;
