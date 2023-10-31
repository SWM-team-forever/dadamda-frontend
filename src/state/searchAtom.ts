import { atomWithStorage } from "jotai/utils";

import {ISearchAtom} from "@/types/ISearchAtom";

const searchAtom = atomWithStorage<ISearchAtom>('searchAtom', {
    keyword: '',
    isSearched: false,
});

export default searchAtom;
