import { useGetBoardIsShared } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardShareModalElement() {
    const { board, setBoard } = useBoardAtom();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(
        ['boardToggle'],
        () => board.boardUUID && useGetBoardIsShared(board.boardUUID),
        {
            select: (data) => {
                return data?.data.isShared;
            },
            onError: () => {
                useDefaultSnackbar('존재하지 않거나 권한이 없는 보드입니다.', 'error');
                navigate('/main');
            },
            retry: false,
            useErrorBoundary: (error: Error) => error.message !== "NF005",
        }
    )
    const [isShared, setIsShared] = useState(false);
    function toggleIsShared() {
        setIsShared(!isShared);
    }

    const [link, setLink] = useState(window.location.href);
    function copyLink() {
        navigator.clipboard.writeText(link).then(() => {
            useDefaultSnackbar('링크가 복사되었습니다.', 'success');
        });
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography>공유 허용</Typography>
                <Switch
                    checked={data}
                    onChange={toggleIsShared}
                />
            </Box>
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
                    value={link}
                    fullWidth
                    disabled
                />
                <Button
                    variant="contained"
                    sx={{
                        flexShrink: 0,
                        height: '40px',
                    }}
                    disabled={!data}
                    onClick={copyLink}
                >
                    링크 복사
                </Button>
            </Box >
        </>
    );
}

export default BoardShareModalElement;
