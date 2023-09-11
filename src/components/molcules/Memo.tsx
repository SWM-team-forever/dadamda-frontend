import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import { Box, Typography } from '@mui/material';
import Tooltip from '@/components/atoms/CategoryItem/Tooltip';

interface MemoProps {
    memoImageURL?: string,
    memoText?: string,
}

function Memo({ memoImageURL, memoText }: MemoProps) {
    return (
        <Box
            sx={{
                p: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                backgroundColor: '#FFF',
                borderRadius: '4px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant='h6'
                    color='#A4AAB7'
                    sx={{
                        fontWeight: '400',
                        lineHeight: '160%',
                    }}
                >
                    2023.09.10
                </Typography>
                <Tooltip />
            </Box>
            {memoText
                ? <Typography
                    variant='h5'
                    color='#656A6F'
                    sx={{
                        fontWeight: '400',
                        lineHeight: '160%',
                    }}
                >
                    {memoText}
                </Typography>
                : <ImageMemo src={memoImageURL} />}
        </Box>
    );
}

const ImageMemo = styled.img<{ imageSource?: string }>`
    width: 100%;
    border-radius: 4px;
`

export default Memo;
