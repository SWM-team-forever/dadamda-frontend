import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import { Box, Typography } from '@mui/material';
import Tooltip from '@/components/atoms/CategoryItem/Tooltip';
import { create } from '@mui/material/styles/createTransitions';
import { getTimeDiff } from '@/hooks/useCalculateDateDiff';

interface MemoProps {
    memoImageURL?: string,
    memoText?: string,
    createdDate: number,
}

function Memo({ memoImageURL, memoText, createdDate }: MemoProps) {
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
                    {getTimeDiff(createdDate)}
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
