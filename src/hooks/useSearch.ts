import searchAtom from "@/state/searchAtom";
import { useAtom } from "jotai";
import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
    const [search, setSearch] = useAtom(searchAtom);
    const [searchParam, setSearchParam] = useSearchParams();
    const searchKeyword = ({keyword, type}: {keyword: string, type: string}) => {
        searchParam.delete('scrapId');
        setSearchParam(searchParam);
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
