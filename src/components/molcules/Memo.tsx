import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import { Box, Typography } from '@mui/material';
import { getTimeDiff } from '@/hooks/useCalculateDateDiff';
import { CloseIcon } from '@/components/atoms/Icon';
import { useDeleteMemo } from '@/api/memo';
import { useGetToken } from '@/hooks/useAccount';

interface MemoProps {
    memoImageURL?: string,
    memoText?: string,
    createdDate: number,
    scrapId: number,
    memoId: number,
}

function Memo({ memoImageURL, memoText, createdDate, scrapId, memoId }: MemoProps) {
    const { mutate } = useDeleteMemo();
    const token = useGetToken();

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
                <Box
                    onClick={
                        () => (token) && mutate({ token, scrapId, memoId })
                    }
                >
                    <CloseIcon width='10' height='10' fill={theme.color.Gray_060} />
                </Box>
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
