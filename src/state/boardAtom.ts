import { IBoardAtom } from "@/types/IBoardAtom";
import { atom } from "jotai";

const boardAtom = atom<IBoardAtom>({
    title: '',
    boardId: '',
});

export default boardAtom;
