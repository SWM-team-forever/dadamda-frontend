/** @jest-environment jsdom */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Memo from '../src/components/molcules/Memo';

describe('memo 컴포넌트 렌더링 확인', () => {
  it('텍스트를 전달하면 해당 텍스트가 보인다.', () => {
    render(<Memo memoText='hi' />);
    const initialState = screen.getByText('hi');

    expect(initialState).toBeInTheDocument();
  });

  test('스냅샷 테스트', () => {
    const memo = render(<Memo memoText='hi'/>);
    expect(memo).toMatchSnapshot();
  });
});
