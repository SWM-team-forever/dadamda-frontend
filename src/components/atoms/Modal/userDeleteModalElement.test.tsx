import { act, renderHook } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import { useModal } from '@/hooks/useModal';

describe('유저 삭제 모달 테스트', () => {
    it('유저 삭제 옵션에 대한 openModal 함수가 잘 동작한다.', () => {
        const { result } = renderHook(() => useModal());
        expect(result.current.modal.isOpen).toBe(false);

        act(() => {
            result.current.openModal('userDelete');
        });
        expect(result.current.modal.title).toBe('회원 탈퇴하기');
    });
})