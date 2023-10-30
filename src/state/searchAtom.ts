import { atom } from "jotai";

import {ISearchAtom} from "@/types/ISearchAtom";

const searchAtom = atom<ISearchAtom>({
    keyword: '',
    isSearched: false,
});

export default searchAtom;
