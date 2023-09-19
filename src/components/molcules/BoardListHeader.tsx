import { Box, Button, Typography } from '@mui/material';

import theme from '../../assets/styles/theme';
import SearchBar from '@/components/molcules/SearchBar';
import { useModal } from '@/hooks/useModal';

interface ScrapListHeaderProps {
    count: number,
}

function BoardListHeader({ count }: ScrapListHeaderProps) {
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
                        보드
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
                    onClick={() => openModal('boardCreate')}
                >
                    + 보드 추가
                </Button>
            </Box>
            <SearchBar type={'board'} />
        </Box>
    )
}

export default BoardListHeader;
