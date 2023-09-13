import { Box, Button, Typography } from '@mui/material';

import theme from '../../assets/styles/theme';
import SearchBar from '@/components/molcules/SearchBar';
import { useModal } from '@/hooks/useModal';

interface ScrapListHeaderProps {
    count: number,
    type: string,
}

function ScrapListHeader({ count, type }: ScrapListHeaderProps) {
    const { openModal } = useModal();

    return (
        <Box
            sx={{
                padding: '24px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '16px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <Typography
                        variant='h1'
                        color={theme.color.Gray_090}
                        sx={{
                            fontWeight: '600',
                            lineHeight: '160%',
                        }}
                    >
                        스크랩 {type}
                    </Typography>
                    <Typography
                        variant='h6'
                        color={theme.color.Gray_070}
                        sx={{
                            fontWeight: '600',
                            lineHeight: '150%',
                        }}
                    >
                        {count} 개
                    </Typography>
                </Box>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => openModal('scrapCreate')}
                >
                    + 스크랩 추가
                </Button>
            </Box>
            <SearchBar />
        </Box>
    )
}

export default ScrapListHeader
