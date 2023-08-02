import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../atoms/DefaultButton';

import ChervronDownIcon from '../../assets/icons/ChevronDownIcon.png';
import ChervronUpIcon from '../../assets/icons/ChevronUpIcon.png';
import logo from '../../assets/images/dadamda-logo128.png';
import CrossIcon from '../../assets/icons/CrossIcon.png';
import theme from '../../assets/styles/theme';
import { googleLoginURL } from '../../secret';
import LoginModal from '../organisms/LoginModal';
import Overlay from '../atoms/Overlay';

interface MobileNavbarProps {
  toggleMobileNavbar: () => void;
}

function MobileNavbar({ toggleMobileNavbar }: MobileNavbarProps) {
  // const [userInformation, setUserInformation] = useContext(LoginContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(ChervronDownIcon);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    isMenuOpen ? setMenuIcon(ChervronUpIcon) : setMenuIcon(ChervronDownIcon);
  };

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  }

  const hideLoginModal = () => {
    setIsLoginModalVisible(false);
  }

  const navigate = useNavigate();

  const login = () => {
    showLoginModal();
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profileImageURL');
    navigate('/main');
  }

  const navbarMenus = [{
    isVisibleWithoutLogin: true,
    name: '사이트 소개',
    onclick: () => {
      navigate('/main');
      toggleMobileNavbar();
    },
  }, {
    isVisibleWithoutLogin: true,
    name: '트렌딩',
    onclick: () => {
      navigate('/trending');
      toggleMobileNavbar();
    },
  }, {
    isVisibleWithoutLogin: false,
    name: '보드',
    onclick: () => {
      navigate('/board');
      toggleMobileNavbar();
    },
  }, {
    isVisibleWithoutLogin: false,
    name: '스크랩',
    onclick: () => toggleMenu(),
    isMenuOpen: true,
  }, {
    isVisibleWithoutLogin: false,
    name: '회원 정보',
    onclick: () => {
      navigate('/user');
      toggleMobileNavbar();
    },
  }];

  const scrapMenu = [{
    name: '전체',
    link: '/scrap/list',
  }, {
    name: '아티클',
    link: '/scrap/article',
  }, {
    name: '상품',
    link: '/scrap/product',
  }, {
    name: '비디오',
    link: '/scrap/video',
  }, {
    name: '장소',
    link: '/scrap/location',
  }, {
    name: '기타',
    link: '/scrap/other',
  }]

  const isLogin = localStorage.getItem('token') ? true : false;

  return (
    <NavbarContainer>
      <IconContainer src={CrossIcon} onClick={toggleMobileNavbar} />
      <NavbarMenu>
        {navbarMenus.map(menu => {
          const isMenuVisible = menu.isVisibleWithoutLogin || isLogin;
          const isMenuHasMenuAndOpen = menu.isMenuOpen && isMenuOpen && isLogin;
          return <>{isMenuVisible &&
            <ItemContainer>
              <div style={{ flex: '1' }} onClick={menu.onclick}>
                <EmpasizedTypography>{menu.name}</EmpasizedTypography>
              </div>
              {menu.isMenuOpen && <IconImg src={menuIcon} onClick={toggleMenu} />}
            </ItemContainer>}
            {
              isMenuHasMenuAndOpen && <MenuContainer>
                {scrapMenu.map(menu => {
                  return (
                    <Link to={menu.link} style={{ textDecoration: 'inherit', color: 'inherit' }} onClick={toggleMobileNavbar}>
                      <DefaultTypography>{menu.name}</DefaultTypography>
                    </Link>
                  )
                })}
              </MenuContainer>
            }</>
        })}
        {isLogin ? <Button label='로그아웃' buttonStyle='primary' onClick={logout} /> : <Button label='로그인/회원가입' buttonStyle='primary' onClick={login} />}
        <IconImg src={logo} style={{ width: "36px", height: "36px", position: "absolute", bottom: "20px", right: "20px" }} />
      </NavbarMenu>
      {isLoginModalVisible &&
        <Overlay>
          <LoginModal hideLoginModal={hideLoginModal} />
        </Overlay>
      }
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
    z-index: 100;
`

const EmpasizedTypography = styled.span`
  font-size: 20px;
  flex: 1;
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
