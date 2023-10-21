import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";

function BoardShareModalElement() {
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
                    checked={isShared}
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
                    disabled={!isShared}
                    onClick={copyLink}
                >
                    링크 복사
                </Button>
            </Box >
        </>
    );
}

export default BoardShareModalElement;
