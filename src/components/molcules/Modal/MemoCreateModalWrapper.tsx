import { Box, Button, Modal, Typography } from '@mui/material';

import { useModal } from '@/hooks/useModal';
import theme from '@/assets/styles/theme';
import { CloseIcon } from '@/components/atoms/Icon';

function MemoCreateModalWrapper() {
    const { modal, closeModal } = useModal();

    return (
        <Modal
            open={modal.isOpen}
            onClose={closeModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box
                sx={{
                    backgroundColor: theme.color.Gray_020,
                    borderRadius: '8px',
                    p: '16px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '360px',
                        md: '435px',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            alignSelf: 'flex-end',
                            cursor: 'pointer',
                        }}
                        onClick={closeModal}
                    >
                        <CloseIcon width='24' height='24' fill={theme.color.Gray_070} />
                    </Box>
                    <Typography
                        variant='h1'
                        sx={{
                            fontWeight: '600',
                            lineHeight: '160%',
                            alignSelf: 'center',
                        }}
                        color={theme.color.Gray_090}
                    >
                        {modal.title}
                    </Typography>
                </Box>
                {modal.element}
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: theme.color.Gray_050,
                        borderRadius: '4px',
                        boxShadow: 'none',
                        width: 'fit-content',
                        alignSelf: 'flex-end',
                        '&:hover': {
                            backgroundColor: theme.color.Blue_080,
                            boxShadow: 'none',
                        }
                    }}
                >
                    등록
                </Button>
            </Box>
        </Modal>
    );
}

export default MemoCreateModalWrapper;
