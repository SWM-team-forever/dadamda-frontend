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
    return text.replace(/\s+/g, '').length === 0;
}
