import {rest} from 'msw';

export const getAccessTokenError = () => {
    return rest.get('/access_token_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "BR001",
            message: "만료된 엑세스 토큰입니다.",
            data: {}
        }))
    })
}

export const getDuplicatedScrapError = () => {
    return rest.get('/duplicated_Scrap_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "BR002",
            message: "이미 저장된 URL 입니다.",
            data: {}
        }))
    })
}

export const getNotExistError = () => {
    return rest.get('/not_exist_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "NF000",
            message: "존재하지 않습니다.",
            data: {}
        }))
    })
}

const getNotExistScrapError = () => {
    return rest.get('/not_exist_scrap_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "NF001",
            message: "존재하지 않는 스크랩 입니다.",
            data: {}
        }))
    })
}

export const getNotExistUserError = () => {
    return rest.get('/not_exist_user_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "NF002",
            message: "존재하지 않는 회원입니다.",
            data: {}
        }))
    })
}

const getNotExistMemoError = () => {
    return rest.get('/not_exist_memo_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "NF003",
            message: "존재하지 않는 메모입니다.",
            data: {}
        }))
    })
}

export const getInternalServerError = () => {
    return rest.get('/internal_server_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "IS000",
            message: "서버 내부 에러가 발생했습니다.",
            data: {}
        }))
    })
}

const apiErrorResponseHandlers = [
    getAccessTokenError(), 
    getDuplicatedScrapError(), 
    getNotExistError(), 
    getNotExistScrapError(),
    getNotExistMemoError(),
    getNotExistUserError(),
    getInternalServerError(),
];

export const handlers = [...Object.values(apiErrorResponseHandlers)]