import { Box, Modal, Typography } from '@mui/material';

import { useModal } from '@/hooks/useModal';
import theme from '@/assets/styles/theme';
import { CloseIcon } from '@/components/atoms/Icon';

function ModalWrapper() {
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
                        xs: '320px',
                        md: '435px',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: modal.title && '16px',
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
            </Box>
        </Modal>
    );
}

export default ModalWrapper;
