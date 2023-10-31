import { useGetToken } from "@/hooks/useAccount";
import { GET_OTHER_SCRAP_URL, GET_LIST_SCRAP_URL, GET_ARTICLE_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL, GET_BOARD_LIST_COUNT_URL } from "@/secret";
import { useQuery } from "@tanstack/react-query";

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

const fetchGetScrapCount = async(type: string) => {
    const token = useGetToken();

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

export const useGetScrapCount = (type: string) => {
    const { data, isLoading, isFetched } = useQuery(['scrapCount', type],
        () => fetchGetScrapCount(type),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                return data?.data.count;
            },
            useErrorBoundary: true,
            retry: false,
        }
    );

    const [count, isCountLoading, isCountFetched] = [data, isLoading, isFetched];
    return { count, isCountLoading, isCountFetched };
}

const getBoardListCount = async() => {
    const token = useGetToken();
    
    const response = await fetch(GET_BOARD_LIST_COUNT_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    })

    const body = response && await response.json();
    if (response && response.ok) {
        return body;
    } else {
        throw new Error(body.resultCode);
    }
}

export const useGetBoardListCount = () => {
    const {data, isLoading} = useQuery(
        ['boardListCount'],
        () => getBoardListCount(),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                return data?.data.count;
            },
            retry: false,
            useErrorBoundary: true,
        }
    );

    const [count, isCountLoading] = [data, isLoading];
    return { count, isCountLoading };
}
