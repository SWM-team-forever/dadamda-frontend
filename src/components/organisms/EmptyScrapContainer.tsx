import { useMoveToChromeExtensionInstallLink } from '@/hooks/useCustomNavigation';
import { useModal } from '@/hooks/useModal';
import { Box, Button, Typography } from '@mui/material';

function EmptyScrapContainer() {
    const moveToChromeExtensionInstallLink = useMoveToChromeExtensionInstallLink;
    const moveToChromeExtensionInstallLinkHandler = () => {
        moveToChromeExtensionInstallLink();
    }

    const { openModal } = useModal();
    const openScrapCreateModalHandler = () => {
        openModal('scrapCreate');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',

                height: '100%',
            }}
        >
            <Typography
                sx={{
                    fontSize: '20px',
                    fontWeight: '500',
                }}
            >
                스크랩을 추가해주세요
            </Typography>
            <Typography
                sx={{
                    textAlign: 'center',
                    wordBreak: 'keep-all',
                }}
            >
                크롬 익스텐션을 설치하시면 더 편하게 스크랩을 추가하실 수 있습니다.
            </Typography>
            <Box>
                <Button
                    onClick={openScrapCreateModalHandler}
                >
                    스크랩 추가하기
                </Button>
                <Button
                    onClick={moveToChromeExtensionInstallLinkHandler}
                >
                    크롬 익스텐션 설치하기
                </Button>
            </Box>
        </Box>
    );
}

export default EmptyScrapContainer;
