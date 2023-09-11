import { Modal } from '@mui/material';

import { useModal } from '@/hooks/useModal';

function MemoCreateModalWrapper() {
    const { modal, closeModal } = useModal();

    return (
        <Modal
            open={modal.isOpen}
            onClose={closeModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            {modal.element}
        </Modal>
    );
}

export default MemoCreateModalWrapper;
