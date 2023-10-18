import { Box, Button, Typography } from '@mui/material';

import theme from '../../assets/styles/theme';
import SearchBar from '@/components/molcules/SearchBar';
import { useModal } from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import { useGetBoardListCount } from '@/api/count';

function BoardListHeader() {
    const { openModal } = useModal();
    const { data, isLoading } = useQuery(['boardListCount'],
        () => {
            return useGetBoardListCount();
        },
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                return data?.data.count;
            }
        }
    );

    if (isLoading) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                로딩중
            </Box>
        )
    }

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
                        {data} 개
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
