import { useIsValidURL } from '@/hooks/useValidation';
import { expect, describe, it } from 'vitest';

describe('validation hook 테스트', () => {
    it('isValidURL을 통해 링크 형식인지 검사한다.', () => {
        expect(useIsValidURL('https://www.naver.com')).toBe(true);
        expect(useIsValidURL('http://www.naver.com')).toBe(true);
        expect(useIsValidURL('https://velog.io/@juanito_y247/React-Query-Devtools')).toBe(true);
        expect(useIsValidURL('www.naver.com')).toBe(false);
        expect(useIsValidURL('https://velog.io/@juhyeon1114/React-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A6%AC%EB%B7%B0-Zustand-Recoil-Jotai-React-query')).toBe(true);
    });
})
