import { isValidURL } from '@/hooks/useValidation';
import { expect, describe, it } from 'vitest';

describe('validation hook 테스트', () => {
    it('isValidURL을 통해 링크 형식인지 검사한다.', () => {
        expect(isValidURL('https://www.naver.com')).toBe(true);
        expect(isValidURL('http://www.naver.com')).toBe(true);
        expect(isValidURL('www.naver.com')).toBe(false);
    });
})