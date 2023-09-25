import { IBoardAtom } from "@/types/IBoardAtom";
import { atom } from "jotai";

const boardAtom = atom<IBoardAtom>({
    title: '',
    columnList: [],
    boardId: '',
    ScrapOrMemoList: [],
});

export default boardAtom;
