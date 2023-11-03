import { useDeleteBoard } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { logEvent } from "@/utility/amplitude";
import { Button } from "@mui/material";

function DeleteBoardButton() {
    const { board } = useBoardAtom();
    const { mutate } = useDeleteBoard();
    const { closeModal } = useModal();

    const handleDeleteBoardButtonClick = () => {
        (board.boardUUID) && mutate(board.boardUUID);
        logEvent('delete_board');
        closeModal();
    }

    return (
        <Button
            variant="outlined"
            fullWidth
            onClick={handleDeleteBoardButtonClick}
            size="large"
        >
            삭제하기
        </Button>
    );
}

export default DeleteBoardButton;
