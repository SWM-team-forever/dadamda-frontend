import { atom } from "jotai";

import { contentProps } from "@/types/ContentType";

const selectedScrapAtom = atom<contentProps['content']>({
    pageUrl: '',
    scrapId: 0,
    memoList: [],
    dtype: '',
});

export default selectedScrapAtom;
