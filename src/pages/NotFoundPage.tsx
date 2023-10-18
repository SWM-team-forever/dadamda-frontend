import { Box, Button, Typography } from "@mui/material";

function NotFoundPage() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                gap: '10px',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                }}
            >
                페이지를 찾을 수 없습니다.
            </Typography>
            <Typography>
                권한이 없거나 존재하지 않는 페이지입니다. 홈페이지로 돌아가주세요.
            </Typography>
            <Button variant="contained" color="primary" href="/">
                홈으로 돌아가기
            </Button>
        </Box>
    );
}

export default NotFoundPage;
