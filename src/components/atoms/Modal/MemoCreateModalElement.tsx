import { Box, OutlinedInput, Typography } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';

import theme from '@/assets/styles/theme';

function MemoCreateModalElement() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
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
        </Box>
    );
}

export default MemoCreateModalElement;
