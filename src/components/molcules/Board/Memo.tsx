import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { getTimeDiff } from '@/hooks/useCalculateDateDiff';
import { TMemo } from '@/types/ContentType';

function Memo({ createdDate, memoText, memoImageURL }: TMemo) {
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
            onClick={(e) => {
                e.stopPropagation();
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
            </Box>
            {
                memoText
                    ? <Typography
                        variant='h5'
                        color='#656A6F'
                        sx={{
                            fontWeight: '400',
                            lineHeight: '160%',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                        }}
                    >
                        {memoText}
                    </Typography>
                    : <ImageMemo src={memoImageURL} />
            }
        </Box >
    );
}

const ImageMemo = styled.img<{ imageSource?: string }>`
    width: 100%;
    border-radius: 4px;
`

export default Memo;
