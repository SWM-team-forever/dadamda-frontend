import { Box, Button, Switch, TextField, Typography } from "@mui/material";

function BoardShareModalElement() {
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
                <Switch />
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
                    value={window.location.href}
                    fullWidth
                    disabled
                />
                <Button
                    variant="contained"
                    sx={{
                        flexShrink: 0,
                        height: '40px',
                    }}
                >
                    링크 복사
                </Button>
            </Box >
        </>
    );
}

export default BoardShareModalElement;
