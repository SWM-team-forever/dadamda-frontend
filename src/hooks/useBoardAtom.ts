import boardAtom from "@/state/boardAtom";
import { useAtom } from "jotai"

export const useBoardAtom = () => {
    const [board, setBoard] = useAtom(boardAtom);

    return {
        board,
        setBoard,
    }
}
