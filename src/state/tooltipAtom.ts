import { atom } from "jotai";

import { ITooltipAtom } from "@/types/ITooltipAtom";

const tooltipAtom = atom<ITooltipAtom>(
    {
        isOpen: false,
    }
);

export default tooltipAtom;