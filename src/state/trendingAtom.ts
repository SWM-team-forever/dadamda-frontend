import { atom } from "jotai";

import { ITrendingAtom } from "@/types/ITrendingAtom";

const trendingAtom = atom<ITrendingAtom>({
	tag: "LIST",
});

export default trendingAtom;
