import { useToggleBoardIsPublic } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { Button } from "@mui/material";

function PublishBoardButton({ isBoardPublic }: { isBoardPublic: boolean }) {
    const { mutate } = useToggleBoardIsPublic();
    const { board } = useBoardAtom();
    const handlePublishBoard = () => {
        board.boardUUID && mutate(board.boardUUID)
    }

    return (
        <Button
            variant="contained"
            size="large"
            onClick={handlePublishBoard}
        >
            {isBoardPublic ? '트렌딩에 보드 게시' : '트렌딩에 보드 게시 취소'}
        </Button>
    )
}

export default PublishBoardButton;
