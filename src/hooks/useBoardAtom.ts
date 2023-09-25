import boardAtom from "@/state/boardAtom";
import { Scrap } from "@/types/IBoardAtom";
import { useAtom } from "jotai"

export const useBoardAtom = () => {
    const [board, setBoard] = useAtom(boardAtom);
    
    const pasteScrap = (scrap: Scrap) => {
        setBoard((prev) => {
            const columnId = prev.columnList.length > 0 ? prev.columnList[0].columnId.toString() : '0';
            return {
                ...prev,
                ScrapOrMemoList: [
                    ...prev.ScrapOrMemoList,
                    { ...scrap, columnId },
                ],
                columnList: prev.columnList.length === 0 ? [{ columnId: '0', columnName: '기본' }] : prev.columnList,
            };
        });
    };

    return {
        board,
        setBoard,
        pasteScrap,
    }
}
