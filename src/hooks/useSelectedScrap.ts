import { useAtom } from "jotai";
import { useCallback } from "react";

import selectedScrapAtom from "@/state/selectedScrapAtom";

export const useSelectedScrap = () => {
    const [selectedScrap, setSelectedScrap] = useAtom(selectedScrapAtom);

    const removeSelectedScrap = useCallback(() => {
        setSelectedScrap({
            pageUrl: '',
            scrapId: 0,
            memoList: [],
            dtype: '',
        });
    }, [setSelectedScrap]);

    return { selectedScrap, setSelectedScrap, removeSelectedScrap };
}
