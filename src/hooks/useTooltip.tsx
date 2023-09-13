import { useAtom } from "jotai";
import { useCallback } from "react";

import tooltipAtom from "@/state/tooltipAtom";

export const useTooltip = () => {
    const [tooltip, setTooltip] = useAtom(tooltipAtom);

    const closeTooltip = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setTooltip((prev) => { return { ...prev, isOpen: false } })
    }, [setTooltip]);

    const openTooltip = useCallback((
        menu: {
            title: string,
            clickAction: (e: React.MouseEvent<HTMLElement>) => void,
        }[],
        anchorEl: HTMLElement
    ) => {
        setTooltip({
            ...tooltip,
            menu: menu,
            anchorEl: anchorEl,
            isOpen: true,
        })
    }, [setTooltip]);

    return { tooltip, closeTooltip, openTooltip };
}
