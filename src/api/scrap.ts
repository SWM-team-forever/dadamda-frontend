import { GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL } from "../secret";

const fetchDatas = async ({ url, pages, size, token }) => {
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

export const uesGetProductScrap = async({pages, size, token}) => {
    const scraps = await fetchDatas({url: GET_PRODUCT_SCRAP_URL, pages: pages, size: size, token: token});
    return scraps;
};

export const useGetVideoScrap = async({pages, size, token}) => {
    const scraps = await fetchDatas({url: GET_VIDEO_SCRAP_URL, pages: pages, size: size, token: token});
    return scraps;
};
