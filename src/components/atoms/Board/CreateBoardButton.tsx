import { useModal } from "@/hooks/useModal";
import { Button } from "@mui/material";

function CreateBoardButton() {
    const { modal, openModal } = useModal();
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
