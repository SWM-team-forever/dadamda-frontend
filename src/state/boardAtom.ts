import { IBoardAtom } from "@/types/IBoardAtom";
import { atom } from "jotai";

const boardAtom = atom<IBoardAtom>({
    title: '',
    boardUUID: '',
    description: '',
    tag: '',
});

export default boardAtom;
