import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../atoms/DefaultButton';
import UserConsumer from '../../context/UserContext';

import ChervronDownIcon from '../../assets/icons/ChevronDownIcon.png';
import ChervronUpIcon from '../../assets/icons/ChevronUpIcon.png';
import logo from '../../assets/images/dadamda-logo128.png';
import CrossIcon from '../../assets/icons/CrossIcon.png';
import theme from '../../assets/styles/theme';

interface MobileNavbarProps {
  toggleMobileNavbar: () => void;
}

function MobileNavbar({ toggleMobileNavbar }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(ChervronDownIcon);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    isMenuOpen ? setMenuIcon(ChervronUpIcon) : setMenuIcon(ChervronDownIcon);
  };
  const [user, dispatch] = UserConsumer() as any;

  const navigate = useNavigate();

  const login = () => {
    dispatch({ type: 'login' });
    navigate('/scrap');
  }

  const logout = () => {
    dispatch({ type: 'logout' });
    navigate('/main');
  }

  const navbarMenus = [{
    isVisibleWithoutLogin: true,
    name: '사이트 소개',
    link: '/main',
  }, {
    isVisibleWithoutLogin: true,
    name: '트렌딩',
    link: '/trending',
  }, {
    isVisibleWithoutLogin: false,
    name: '보드',
    link: '/board',
  }, {
    isVisibleWithoutLogin: false,
    name: '스크랩',
    link: '/scrap',
    isMenuOpen: true,
  }, {
    isVisibleWithoutLogin: false,
    name: '회원 정보',
    link: '/user',
  }];

  const scrapMenu = [{
    name: '전체',
  }, {
    name: '아티클',
  }, {
    name: '상품',
  }, {
    name: '비디오',
  }, {
    name: '장소',
  }, {
    name: '기타',
  }]

  return (
    <NavbarContainer>
      <IconContainer src={CrossIcon} onClick={toggleMobileNavbar} />
      <NavbarMenu>
        {navbarMenus.map(menu => {
          const isMenuVisible = menu.isVisibleWithoutLogin || user;
          const isMenuHasMenuAndOpen = menu.isMenuOpen && isMenuOpen && user;
          return <>{isMenuVisible && <ItemContainer>
            <Link to={menu.link} style={{ textDecoration: 'inherit', color: 'inherit' }}>
              <EmpasizedTypography>{menu.name}</EmpasizedTypography>
            </Link>
            {menu.isMenuOpen && <IconImg src={menuIcon} onClick={toggleMenu} />}
          </ItemContainer>}
            {
              isMenuHasMenuAndOpen && <MenuContainer>
                {scrapMenu.map(menu => {
                  return <DefaultTypography>{menu.name}</DefaultTypography>
                })}
              </MenuContainer>
            }</>
        })}
        {user ? <Button label='로그아웃' buttonStyle='primary' onClick={logout} /> : <Button label='로그인/회원가입' buttonStyle='primary' onClick={login} />}
        <IconImg src={logo} style={{ width: "36px", height: "36px", position: "absolute", bottom: "20px", right: "20px" }} />
      </NavbarMenu>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
    width: 250px;
    height: 100vh;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    box-shadow: ${theme.style.shadow};
`

const EmpasizedTypography = styled.span`
  font-size: 20px;
`

const DefaultTypography = styled.span`
  font-size: 14px;
  color: ${theme.color.secondary_text_gray_color};
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const IconContainer = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
`

const IconImg = styled.img`
  width: 24px;
    height: 24px;
    cursor: pointer;
`

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 100px 20px;
`

const ItemContainer = styled.div`
  display: flex;
    justify-content: space-between;
`

export default MobileNavbar;
