import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <HeaderList>
        <Link to="/" style={{ textDecoration: "none"}}><ul>로그인</ul></Link>
        <Link to="/register" style={{ textDecoration: "none"}}><ul>회원가입</ul></Link>
        <Link to="/cards" style={{ textDecoration: "none"}}><ul>카드 뷰 페이지</ul></Link>
    </HeaderList>
  )
}

const HeaderList = styled.li`
    display: flex;
    height: 50px;
    align-items: center;
`

export default Header
