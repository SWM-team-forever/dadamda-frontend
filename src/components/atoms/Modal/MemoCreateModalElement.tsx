import { Box, Button, CircularProgress, OutlinedInput, Typography } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';

import theme from '@/assets/styles/theme';
import { useModal } from '@/hooks/useModal';
import { usePostCreateMemo } from '@/api/memo';
import { useDefaultSnackbar } from '@/hooks/useWarningSnackbar';

function MemoCreateModalElement() {
    const [, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { modal, closeModal } = useModal();
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    const scrapId = modal.scrapId;
    const token = localStorage.getItem('token');
    const { mutate, isLoading, isError } = usePostCreateMemo();

    if (isLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    if (isError) {
        useDefaultSnackbar('메모 생성에 실패하였습니다.', 'error');
    }

    const MAX_MEMO_LENGTH = 1000;

    return (
        <Box
            sx={{
                p: '0 16px'
            }}
        >
            <OutlinedInput
                placeholder="추가할 메모를 입력하세요."
                onChange={(e) => handleSetValue(e)}
                sx={{
                    width: '100%',
                    color: theme.color.Gray_060,
                    fontWeight: '500',
                    fontHeight: '150%',
                }}
                multiline
            />
            <Typography
                variant="h6"
                color={theme.color.Gray_060}
                sx={{
                    fontWeight: '500',
                    lineHeight: '150%',
                    mt: '6px',
                }}
            >
                {textAreaValue.length} / {MAX_MEMO_LENGTH}자
            </Typography>
            <Button
                variant='contained'
                sx={{
                    backgroundColor: theme.color.Gray_050,
                    borderRadius: '4px',
                    boxShadow: 'none',
                    width: 'fit-content',
                    alignSelf: 'flex-end',
                    '&:hover': {
                        backgroundColor: theme.color.Blue_080,
                        boxShadow: 'none',
                    }
                }}
                onClick={
                    () => {
                        (token && scrapId) && mutate({ token, scrapId, textAreaValue });
                        closeModal();
                    }
                }
            >
                등록
            </Button>
        </Box>
    );
}

export default MemoCreateModalElement;
