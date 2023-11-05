import theme from "@/assets/styles/theme";
import { useModal } from "@/hooks/useModal";
import { Modal, Box } from "@mui/material";

function FullScreenModalWrapper() {
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
                    width: 'calc(100vw - 50px)',
                    height: 'calc(100vh - 50px)',
                    borderRadius: '8px',
                    position: 'absolute',
                    left: '25px',
                    top: '25px',
                }}
            >
                {modal.element}
            </Box>
        </Modal>
    );
}

export default FullScreenModalWrapper;
