import { act, render, renderHook } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { useModal } from '@/hooks/useModal';
import ScrapListHeader from '@/components/molcules/ScrapListHeader';

describe('스크랩 추가하기 모달 테스트', () => {
    it('스크랩 추가하기 버튼을 누르면 모달 atom의 isOpen 상태가 변경된다.', () => {
        const { result } = renderHook(() => useModal());
        expect(result.current.modal.isOpen).toBe(false);

        act(() => {
            render(<ScrapListHeader count={1} type={'list'} />)
        });

        act(() => {
            userEvent.click(screen.getByText('+ 스크랩 추가'));
        });

        expect(result.current.modal.isOpen).toBe(true);
    });
})