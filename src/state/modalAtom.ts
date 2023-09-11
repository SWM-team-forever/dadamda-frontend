import IModalsInfoAtom from "@/types/IModalsInfoAtom";
import { atom } from "jotai";

const modalAtom = atom<IModalsInfoAtom>({
    modals: [],
});

export default modalAtom;
