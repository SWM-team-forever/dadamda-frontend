import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import { Box, Typography } from '@mui/material';
import Tooltip from '@/components/atoms/CategoryItem/Tooltip';
import { create } from '@mui/material/styles/createTransitions';
import { useTooltip } from '@/hooks/useTooltip';
import { useSelectedScrap } from '@/hooks/useSelectedScrap';
import TooltipWrapper from '@/components/atoms/CategoryItem/TooltipWrapper';

interface MemoProps {
    memoImageURL?: string,
    memoText?: string,
    createdDate: string,
}

function Memo({ memoImageURL, memoText, createdDate, scrapId }: MemoProps & { scrapId: number }) {
    const { closeTooltip } = useTooltip();

    const menuItemContentList = [
        {
            title: '메모 수정',
            clickAction: (e: React.MouseEvent<HTMLElement>) => {
                closeTooltip(e);
            }
        },
        {
            title: '메모 삭제',
            clickAction: (e: React.MouseEvent<HTMLElement>) => {
                closeTooltip(e);
            }
        }
    ]

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
                    {createdDate}
                </Typography>
                <TooltipWrapper menu={menuItemContentList} scrapId={scrapId} />
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
