import { server } from "../mocks/server";
import { getAccessTokenError } from "../mocks/api";
import { render, screen } from '@testing-library/react'
import ScrapTemplate from "../components/templates/ScrapTemplate";

describe('에러 처리 테스트', () => {
  test('BR001 에러가 응답으로 오면 오류 발생 모달이 렌더링된다.', async () => {
    server.use(await getAccessTokenError());
    render(<ScrapTemplate type={'other'} />);
    const $errorModal = await screen.findByText('오류 발생');

    expect($errorModal).toBeInTheDocument()
  })
})
