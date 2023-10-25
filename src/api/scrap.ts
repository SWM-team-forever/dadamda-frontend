import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_SCRAP_URL, EDIT_sCRAP_URL, GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL, POST_CREATE_OTHER_SCRAP_URL } from "../secret";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { contentProps } from "@/types/ContentType";
import * as Sentry from '@sentry/react';

export interface fetchDatasProps {
    url?: string,
    pages: number,
    size: number,
    token: string,
    keyword?: string | null,
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

const findURLByType = {
    'product': GET_PRODUCT_SCRAP_URL,
    'video': GET_VIDEO_SCRAP_URL,
    'article': GET_ARTICLE_SCRAP_URL,
    'list': GET_LIST_SCRAP_URL,
    'other': GET_OTHER_SCRAP_URL,
}

export const useGetScrapByType = async({pages, size, token, type}: fetchDatasProps & {type: string}) => {
    const scraps = await fetchDatas({url: findURLByType[type as keyof typeof findURLByType], pages: pages, size: size, token: token});
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
    const isExistScrap = (error: any) => error.message === 'BR002';

    return useMutation(fetchPostCreateScrap, {
        onSuccess: () => {
            queryClient.invalidateQueries(['scrapCount']);
            queryClient.invalidateQueries(['scraps']);
            useDefaultSnackbar('스크랩이 생성되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            isExistScrap(error) 
            ? useDefaultSnackbar('이미 존재하는 스크랩입니다.', 'error')
            : useDefaultSnackbar('스크랩 생성에 실패하였습니다.', 'error');
        },
        useErrorBoundary: true,
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
            queryClient.invalidateQueries(['scrapCount']);
            queryClient.invalidateQueries(['scraps']);
            useDefaultSnackbar('스크랩이 삭제되었습니다.', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('스크랩 삭제에 실패하였습니다.', 'error');
        },
        useErrorBoundary: true,
    });
}

interface fetchEditScrapProps {
    token: string,
    content: contentProps['content'],
}

const fetchEditScrap = async({token, content}: fetchEditScrapProps) => {
    return await fetch(EDIT_sCRAP_URL, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify(content),
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

export const useEditScrap = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchEditScrap, {
        onSuccess: () => {
            queryClient.invalidateQueries(['scraps']);
            useDefaultSnackbar('스크랩이 변경되었습니다.', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('스크랩 변경에 실패하였습니다.', 'error');
        },
        useErrorBoundary: true,
    });
}
