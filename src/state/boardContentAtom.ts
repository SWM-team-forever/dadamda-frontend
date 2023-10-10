import { IBoardContentAtom } from "@/types/IBoardContentAtom";
import { atom } from "jotai";

const boardContentAtom = atom<IBoardContentAtom>({});

export default boardContentAtom;
