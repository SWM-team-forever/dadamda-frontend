import { GET_OTHER_SCRAP_URL, GET_LIST_SCRAP_URL, GET_ARTICLE_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL } from "@/secret";

const urlMatching: { [key: string]: string } = {
    'other': GET_OTHER_SCRAP_URL,
    'list': GET_LIST_SCRAP_URL,
    'article': GET_ARTICLE_SCRAP_URL,
    'product': GET_PRODUCT_SCRAP_URL,
    'video': GET_VIDEO_SCRAP_URL,
}

interface fetchGetScrapCountProps {
    type: string,
    token: string,
}

const fetchGetScrapCount = async({type, token}: fetchGetScrapCountProps) => {
    const response = await fetch(urlMatching[type] + `/count`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    })
    
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        throw new Error(body.resultCode);
    }
}

export const useGetScrapCount = async({type, token}: fetchGetScrapCountProps) => {
    const count = await fetchGetScrapCount({type: type, token: token});
    return count;
}
