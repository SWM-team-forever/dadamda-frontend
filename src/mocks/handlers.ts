import {rest} from 'msw';

export const handlers = [
    rest.get('/access_token_error', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
            resultCode: "BR002",
            message: "만료된 엑세스 토큰입니다.",
            data: {}
        }))
    })
]