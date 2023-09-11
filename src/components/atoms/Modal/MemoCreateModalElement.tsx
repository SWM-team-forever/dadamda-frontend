import { Box, Typography } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

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

    return (
        <Box>
            <EditText placeholder="추가할 메모를 입력하세요." onChange={(e) => handleSetValue(e)} />
            <Typography>{textAreaValue.length} / 1000자</Typography>
        </Box>
    );
}

const EditText = styled.textarea`
    font-size: 12px;
    border-radius: 4px;
    padding: 15px;
    background-color: ${theme.color.background_color};
    border: none;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    resize: none;
`

export default MemoCreateModalElement;
