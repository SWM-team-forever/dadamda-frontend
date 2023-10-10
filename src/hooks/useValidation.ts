export const MAX_MEMO_LENGTH = 1000;
export const SCRAP_LINK_MAX_LENGTH = 2083;
export const MAX_SCRAP_TITLE_LENGTH = 200;
export const MAX_SCRAP_DESCRIPTION_LENGTH = 1000;
export const MAX_SCRAP_SITENAME_LENGTH = 100;
export const MAX_SCRAP_AUTHOR_LENGTH = 100;
export const MAX_SCRAP_BLOGNAME_LENGTH = 100;
export const MAX_SCRAP_PRICE_LENGTH = 100;
export const MAX_SCRAP_CHANNELNAME_LENGTH = 100;
export const MAX_BOARD_DESCRIPTION_LENGTH = 1000;
export const MAX_BOARD_TITLE_LENGTH = 50;

export function useIsValidURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

export function useIsLessThanLengthLimitation(text: string, limit: number) {
    return text.length <= limit;
}

export function useIsBlank(text: string) {
    return /^\s*$/.test(text);
}

export function useIsEntered(text: string) {
    return text.length > 0;
}

export function useIsWhiteSpaceExist(text: string) {
    return !/^\S*$/.test(text);
}
