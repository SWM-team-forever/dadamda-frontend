import { Button } from "@mui/material";

import { useModal } from "@/hooks/useModal";

function CreateBoardButton() {
    const { openModal } = useModal();
    const handleOpenCreateBoardModal = () => {
        openModal('boardCreate');
    }

    return (
        <Button
            color='primary'
            variant='contained'
            onClick={handleOpenCreateBoardModal}
        >
            + 보드 추가하기
        </Button>
    )
}

export default CreateBoardButton;
