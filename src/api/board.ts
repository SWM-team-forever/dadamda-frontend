import { GET_BOARD_LIST_URL } from "@/secret";

interface fetchDatasProps {
    url?: string;
    pages: number;
    size: number;
}

const token = localStorage.getItem("token");

const fetchDatas = async ({ url, pages, size }: fetchDatasProps) => {
    const response = token && await fetch(url + `?page=${pages}&size=${size}`, {
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

export const useGetBoardList = async ({ pages, size }: fetchDatasProps) => {
    const boards = await fetchDatas({ url: GET_BOARD_LIST_URL, pages: pages, size: size });
    return boards;
}
