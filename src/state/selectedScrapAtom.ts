import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

import { contentProps } from "@/types/ContentType";

const selectedScrapAtom = atomWithStorage<contentProps['content']>('selectedAtom', {
    pageUrl: '',
    scrapId: 0,
    memoList: [],
    dtype: '',
});

export default selectedScrapAtom;
