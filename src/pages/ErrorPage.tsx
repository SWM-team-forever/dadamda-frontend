import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import * as Sentry from "@sentry/react";

import { HAS_NO_ACCESS_ERROR } from "@/hooks/useAccount";
import { useHandleUnVerifiedTokenUser } from "@/context/LoginContext";

import theme from "@/assets/styles/theme";

function ErrorPage({ resetErrorBoundary, error }: any) {
    const navigate = useNavigate();
    const location = useLocation();
    const errorLocation = useRef(location.pathname);
    useEffect(() => {
        Sentry.captureException(error);
        if (location.pathname !== errorLocation.current) {
            resetErrorBoundary();
        }
    }, [location.pathname]);

    const goBack = () => {
        navigate(-1);
    };

    if (error.message === HAS_NO_ACCESS_ERROR || error.message === 'BR001') {
        useHandleUnVerifiedTokenUser();
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Typography
                variant="h1"
                color={theme.color.Gray_090}
                sx={{
                    fontWeight: '500',
                }}
            >
                에러
            </Typography>
            <Typography
                variant="h3"
                color={theme.color.Gray_080}
                sx={{
                    fontWeight: '500',
                }}
            >
                에러가 발생했습니다. 다시 시도해주세요.
            </Typography>
            <Button
                variant='contained'
                onClick={goBack}
            >
                뒤로 가기
            </Button>
        </Box>
    )
}

export default ErrorPage;
