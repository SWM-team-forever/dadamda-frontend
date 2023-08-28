import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_SCRAP_URL, GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL, POST_CREATE_OTHER_SCRAP_URL } from "../secret";

interface fetchDatasProps {
    url?: string,
    pages: number,
    size: number,
    token: string,
}

const fetchDatas = async ({ url, pages, size, token }: fetchDatasProps) => {
    const response = await fetch(url + `?page=${pages}&size=${size}`, {
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

export const uesGetProductScrap = async({pages, size, token}: fetchDatasProps) => {
    const scraps = await fetchDatas({url: GET_PRODUCT_SCRAP_URL, pages: pages, size: size, token: token});
    return scraps;
};

export const useGetVideoScrap = async({pages, size, token}: fetchDatasProps) => {
    const scraps = await fetchDatas({url: GET_VIDEO_SCRAP_URL, pages: pages, size: size, token: token});
    return scraps;
};

export const useGetArticleScrap = async({pages, size, token}: fetchDatasProps) => {
    const scraps = await fetchDatas({url: GET_ARTICLE_SCRAP_URL, pages: pages, size: size, token: token});
    return scraps;
}

export const useGetListScrap = async({pages, size, token}: fetchDatasProps) => {
    const scraps = await fetchDatas({url: GET_LIST_SCRAP_URL, pages: pages, size: size, token: token});
    return scraps;
}

interface fetchPostCreateScrapProps {
    token: string,
    textAreaValue: string,
}

const fetchPostCreateScrap = async({token, textAreaValue}: fetchPostCreateScrapProps) => {
    return await fetch(POST_CREATE_OTHER_SCRAP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            pageUrl: textAreaValue,
        }),
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    })
}

export const usePostCreateScrap = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchPostCreateScrap, {
        onSuccess: () => {
            queryClient.invalidateQueries(['scraps']);
        }
    });
}

interface fetchDeleteScrapProps {
    scrapId: number,
    token: string,
}

const fetchDeleteScrap = async({scrapId, token}: fetchDeleteScrapProps) => {
    return await fetch(DELETE_SCRAP_URL + `/${scrapId}`, {
        method: "DELETE",
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
}

export const useDeleteScrap = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteScrap, {
        onSuccess: () => {
            queryClient.invalidateQueries(['scraps']);
        }
    });
}
