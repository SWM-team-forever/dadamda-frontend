import searchAtom from "@/state/searchAtom";
import { useAtom } from "jotai";

export const useSearch = () => {
    const [search, setSearch] = useAtom(searchAtom);
    const searchKeyword = ({keyword, type}: {keyword: string, type: string}) => {
        setSearch({
            keyword: keyword,
            isSearched: true,
            type: type,
        });
    };

    const undoSearch = () => {
        setSearch(defaultSearchState);
    };

    const defaultSearchState = {
        keyword: '',
        isSearched: false,
    }

    return {
        search,
        searchKeyword,
        undoSearch,
    };
}