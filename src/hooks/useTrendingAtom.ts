import trendingAtom from "@/state/trendingAtom";
import { useAtom } from "jotai";

export const useTrendingAtom = () => {
	const [trending, setTrending] = useAtom(trendingAtom);
	return {
		trending,
		setTrending,
	};
};
