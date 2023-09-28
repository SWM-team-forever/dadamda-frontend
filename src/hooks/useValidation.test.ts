import { useIsBlank, useIsEntered, useIsLessThanLengthLimitation, useIsValidURL, useIsWhiteSpaceExist } from '@/hooks/useValidation';
import { expect, describe, it } from 'vitest';

describe('validation hook 테스트', () => {
    it('isValidURL을 통해 링크 형식인지 검사한다.', () => {
        expect(useIsValidURL('https://www.naver.com')).toBe(true);
        expect(useIsValidURL('http://www.naver.com')).toBe(true);
        expect(useIsValidURL('https://velog.io/@juanito_y247/React-Query-Devtools')).toBe(true);
        expect(useIsValidURL('www.naver.com')).toBe(false);
        expect(useIsValidURL('https://velog.io/@juhyeon1114/React-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A6%AC%EB%B7%B0-Zustand-Recoil-Jotai-React-query')).toBe(true);
    });

    it('useIsLessThanLengthLimitation을 통해 길이 제한이 감지 되는지 검사한다.', () => {
        expect(useIsLessThanLengthLimitation('1234567890', 10)).toBe(true);
        expect(useIsLessThanLengthLimitation('1234567890', 9)).toBe(false);
    });

    it('useIsBlank을 통해 공백으로 이루어졌는지 검사한다.', () => {
        expect(useIsBlank('')).toBe(true);
        expect(useIsBlank(' ')).toBe(true);
        expect(useIsBlank('  ')).toBe(true);
        expect(useIsBlank('  a')).toBe(false);
        expect(useIsBlank('a  ')).toBe(false);
        expect(useIsBlank('  a  ')).toBe(false);
        expect(useIsBlank('a')).toBe(false);
        expect(useIsBlank(`\n`)).toBe(true);
        expect(useIsBlank(`\t`)).toBe(true);
    });

    it('useIsEntered를 통해 입력이 되었는지 검사한다.', () => {
        expect(useIsEntered('')).toBe(false);
        expect(useIsEntered(' ')).toBe(true);
        expect(useIsEntered('a')).toBe(true);
    });

    it('useIsWhiteSpaceExist를 통해 공백이 존재하는지 검사한다.', () => {
        expect(useIsWhiteSpaceExist(' ')).toBe(true);
        expect(useIsWhiteSpaceExist('a')).toBe(false);
        expect(useIsWhiteSpaceExist('a ')).toBe(true);
        expect(useIsWhiteSpaceExist(`a\n`)).toBe(true);
        expect(useIsWhiteSpaceExist(`\n\n`)).toBe(true);
        expect(useIsWhiteSpaceExist(`\t`)).toBe(true);
    });
})
