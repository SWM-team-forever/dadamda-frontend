import { IBoardContainersAtom } from "@/types/IBoardContainersAtom";
import { atom } from "jotai";

const boardContainersAtom = atom<IBoardContainersAtom>([]);

export default boardContainersAtom;
