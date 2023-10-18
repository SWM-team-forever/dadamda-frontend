import { atom } from "jotai";

import { ICustomModalInfo } from "@/types/IModalsInfoAtom";

const modalAtom = atom<ICustomModalInfo>(
    {
        title: '',
        isOpen: false,
        element: '',
        position: '',
    }
);

export default modalAtom;
