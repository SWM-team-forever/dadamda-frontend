import { useDeleteScrap } from '@/api/scrap';
import { useDefaultSnackbar } from '@/hooks/useWarningSnackbar';
import { CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';

function ScrapDeleteElementModal() {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { mutate } = useDeleteScrap();

    return (
        <Box>

        </Box>
    );
}

export default ScrapDeleteElementModal;
