import boardAtom from "@/state/boardAtom";
import { Scrap } from "@/types/IBoardAtom";
import { useAtom } from "jotai"

export const useBoardAtom = () => {
    const [board, setBoard] = useAtom(boardAtom);
    
    const pasteScrap = (scrap: Scrap) => {
        setBoard((prev) => {
            const newBoard = {...prev};
            newBoard.ScrapOrMemoList.push({...scrap, columnId: board.columnList[0].columnId});
            return newBoard;
        })
    }

    return {
        board,
        setBoard,
        pasteScrap,
    }
}
