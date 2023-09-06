import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../atoms/DefaultButton';

import ChervronDownIcon from '../../../assets/icons/ChevronDownIcon.png';
import ChervronUpIcon from '../../../assets/icons/ChevronUpIcon.png';
import theme from '../../../assets/styles/theme';
import LoginModal from '../../organisms/LoginModal';
import Overlay from '../../atoms/Overlay';
import { CloseIcon, DownArrowIcon, ProfileIcon } from '../../atoms/Icon';
import { Box, Typography } from '@mui/material';
import ProfileImage from '../../atoms/ProfileImage';
import ScrapNaviagtion from './ScrapNaviagtion';

interface MobileNavbarProps {
  toggleMobileNavbar: () => void;
}

function MobileNavbar({ toggleMobileNavbar }: MobileNavbarProps) {
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
  const profileImageURL = localStorage.getItem('profileImageURL');

  return (
    <NavbarContainer>
      <div
        onClick={toggleMobileNavbar}
        style={{
          width: '100%',
          padding: '15px 0 7px 15px',
        }}
      >
        <CloseIcon width='24' height='24' fill={theme.color.Gray_090} />
      </div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {profileImageURL
          ? <ProfileImage source={profileImageURL} size={64} />
          : <ProfileIcon size='64' />
        }
        <Typography
          color={theme.color.Gray_090}
          variant='h2'
          sx={{
            fontWeight: '600',
          }}
        >
          {isLogin ? '유저 닉네임' : '로그인 해주세요.'}
        </Typography>
      </Box>

      <NavbarMenu>
        {navbarMenus.map(menu => {
          const isMenuVisible = menu.isVisibleWithoutLogin || isLogin;
          const isMenuHasMenuAndOpen = menu.isMenuOpen && isMenuOpen && isLogin;
          return (
            <>
              {isMenuVisible &&
                <ItemContainer>
                  <div onClick={menu.onclick}>
                    <EmpasizedTypography>{menu.name}</EmpasizedTypography>
                  </div>
                  {menu.isMenuOpen &&
                    <div onClick={toggleMenu}>
                      <DownArrowIcon width='24' height='24' fill={theme.color.Gray_090} />
                    </div>}
                </ItemContainer>}
              {
                isMenuHasMenuAndOpen && <MenuContainer>
                  <ScrapNaviagtion />
                </MenuContainer>
              }
            </>
          )
        })}
        {isLogin ? <Button label='로그아웃' buttonStyle='primary' onClick={logout} /> : <Button label='로그인/회원가입' buttonStyle='primary' onClick={login} />}
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

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
