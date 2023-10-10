import { useDeleteBoard } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { Button } from "@mui/material";

function DeleteBoardButton() {
    const { board } = useBoardAtom();
    const { mutate } = useDeleteBoard();
    const { closeModal } = useModal();

    const handleDeleteBoardButtonClick = () => {
        (board.boardId) && mutate(board.boardId);
        closeModal();
    }

    return (
        <Button
            variant="contained"
            fullWidth
            onClick={handleDeleteBoardButtonClick}
        >
            삭제하기
        </Button>
    );
}

export default DeleteBoardButton;
