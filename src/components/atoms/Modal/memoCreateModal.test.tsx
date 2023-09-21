import { act, render, renderHook } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import scrapCardDataMock from '__mocks__/scrapCardDataMock';

import { useModal } from '@/hooks/useModal';

import ScrapCard from '@/components/organisms/ScrapCard';

describe('메모 추가하기 모달 테스트', () => {
  it('메모 추가하기 버튼을 누르면 모달 atom의 isOpen 상태가 변경된다.', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.modal.isOpen).toBe(false);

    act(() => {
      render(<ScrapCard content={scrapCardDataMock} />);
    });

    act(() => {
      userEvent.click(screen.getByText('+ 메모 추가'));
    });

    expect(result.current.modal.isOpen).toBe(true);
  });

  it('메모 추가하기 버튼을 누르면 모달 atom의 scrapId 상태가 변경된다.', () => {
    render(<ScrapCard content={scrapCardDataMock} />);
    userEvent.click(screen.getByText('+ 메모 추가'));

    const { result } = renderHook(() => useModal());
    expect(result.current.modal.scrapId).toBe(scrapCardDataMock.scrapId);
  });
})