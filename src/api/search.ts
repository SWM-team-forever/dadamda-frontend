import { fetchDatasProps } from "@/api/scrap";
import { GET_ARTICLE_SCRAP_SEARCH_URL, GET_LIST_SCRAP_SEARCH_URL, GET_OTHER_SCRAP_SEARCH_URL, GET_PRODUCT_SCRAP_SEARCH_URL, GET_VIDEO_SCRAP_SEARCH_URL } from "@/secret";

const fetchGetSearchResult = async ({ url, pages, size, keyword }: fetchDatasProps) => {
    const token = useGetToken();

    const response = await fetch(url + `?page=${pages}&size=${size}&keyword=${keyword}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    });

    return response;
};

const findURLByType = {
    'product': GET_PRODUCT_SCRAP_SEARCH_URL,
    'video': GET_VIDEO_SCRAP_SEARCH_URL,
    'article': GET_ARTICLE_SCRAP_SEARCH_URL,
    'list': GET_LIST_SCRAP_SEARCH_URL,
    'other': GET_OTHER_SCRAP_SEARCH_URL,
}

export const useGetScrapSearchResultByType = async({pages, size, type, keyword}: fetchDatasProps & {type: string}) => {
    const scraps = await fetchGetSearchResult({url: findURLByType[type as keyof typeof findURLByType], pages: pages, size: size, keyword: keyword});
    return scraps;
}
