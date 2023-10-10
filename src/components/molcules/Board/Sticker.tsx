import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { getTimeDiff } from '@/hooks/useCalculateDateDiff';
import { CloseIcon } from '@/components/atoms/Icon';
import { TMemo } from '@/types/ContentType';
import theme from '@/assets/styles/theme';

interface StickerProps {
    content: TMemo;
}

function Sticker({ content }: StickerProps) {
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
                    {getTimeDiff(content.createdDate)}
                </Typography>
                <Box
                >
                    <CloseIcon width='10' height='10' fill={theme.color.Gray_060} />
                </Box>
            </Box>
            {
                content.memoText
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
                        {content.memoText}
                    </Typography>
                    : <ImageMemo src={content.memoImageURL} />
            }
        </Box >
    );
}

const ImageMemo = styled.img<{ imageSource?: string }>`
    width: 100%;
    border-radius: 4px;
`

export default Sticker;
