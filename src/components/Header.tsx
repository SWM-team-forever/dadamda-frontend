import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderList>
        <ul>로그인</ul>
        <ul>회원가입</ul>
        <ul>카드 뷰 페이지</ul>
    </HeaderList>
  )
}

const HeaderList = styled.li`
    display: flex;
    height: 50px;
    align-items: center;
`

export default Header
