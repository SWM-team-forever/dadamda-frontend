import { Box, Button, Switch, TextField, Typography } from "@mui/material";

import { useGetBoardIsShared, useGetShortenedSharingBoardUrl, useToggleBoardIsShared } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { logEvent } from "@amplitude/analytics-browser";

import { typographyStyle } from "@/components/atoms/Modal/BoardShareAndPublishModalElement";

function BoardShareModalElement({ value, index }: { value: number, index: number }) {
    const { board, setBoard } = useBoardAtom();
    const sharingBoardUrl = window.location.href + `?bs=shared`;
    const { isBoardShared } = useGetBoardIsShared(board.boardUUID);
    const { shortenedSharingBoardUrl, isLoadingGetShortenedSharingBoardUrl } = useGetShortenedSharingBoardUrl(sharingBoardUrl);
    const { mutate } = useToggleBoardIsShared();
    function copyLink() {
        navigator.clipboard.writeText(shortenedSharingBoardUrl || "").then(() => {
            useDefaultSnackbar('링크가 복사되었습니다.', 'success');
        });
        logEvent('copy_link_click', {
            boardUUID: board.boardUUID,
        });
    }

    if (isLoadingGetShortenedSharingBoardUrl) {
        return (
            <Typography>링크를 불러오는 중입니다...</Typography>
        )
    }

    if (value !== index) {
        return;
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    p: '25px 0',
                }}
            >
                <Typography sx={typographyStyle} >
                    공유 허용
                </Typography>
                <Switch
                    checked={isBoardShared}
                    onChange={() => board.boardUUID && mutate(board.boardUUID)}
                />
            </Box >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                    gap: '5px',
                }}
            >
                <TextField
                    size="small"
                    value={shortenedSharingBoardUrl}
                    fullWidth
                    disabled
                />
                <Button
                    variant="contained"
                    sx={{
                        flexShrink: 0,
                        height: '40px',
                    }}
                    disabled={!isBoardShared}
                    onClick={copyLink}
                >
                    링크 복사
                </Button>
            </Box >
        </>
    );
}

export default BoardShareModalElement;
