import { useState, useEffect, ChangeEvent } from 'react';
import { Box, Button, OutlinedInput } from '@mui/material';

import { usePostCreateScrap } from '@/api/scrap';
import theme from '@/assets/styles/theme';
import { useModal } from '@/hooks/useModal';

import { LinkIcon } from '@/components/atoms/Icon';

function ScrapCreateModalElement() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const { closeModal } = useModal();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    };

    const { mutate } = usePostCreateScrap();

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '9px',
                mb: '24px',
            }}
        >
            <OutlinedInput
                placeholder="추가할 메모를 입력하세요."
                onChange={(e) => handleSetValue(e)}
                sx={{
                    width: '100%',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontHeight: '150%',
                    borderRadius: '8px',
                    backgroundColor: '#FFF',
                    border: `1px solid ${theme.color.Gray_040}`,
                    height: 'fit-content',
                    p: '12px',
                    gap: '12px',
                    '& .MuiInputBase-root': {
                        p: '12px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                    },
                    '& input': {
                        p: '0',
                    },
                    '& fieldset': {
                        border: 'none',
                        color: theme.color.Gray_060,
                    },
                }}
                startAdornment={
                    <LinkIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />
                }
            />
            <Button
                variant='contained'
                sx={{
                    backgroundColor: theme.color.Gray_050,
                    borderRadius: '4px',
                    boxShadow: 'none',
                    width: 'fit-content',
                    p: '8px 14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '150%',
                    '&:hover': {
                        backgroundColor: theme.color.Blue_080,
                        boxShadow: 'none',
                    }
                }}
                onClick={
                    () => {
                        (token) && mutate({ token, textAreaValue });
                        closeModal();
                    }
                }
            >
                추가
            </Button>
        </Box>
    );
}

export default ScrapCreateModalElement;
