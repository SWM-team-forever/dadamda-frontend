export const MAX_MEMO_LENGTH = 1000;

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
    return /^\S*$/.test(text);
}
