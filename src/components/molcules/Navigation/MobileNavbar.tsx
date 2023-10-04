import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '../../../assets/styles/theme';

import { Box, Typography } from '@mui/material';

import Overlay from '../../atoms/Overlay';
import { CloseIcon, DownArrowIcon, ProfileIcon } from '../../atoms/Icon';
import ProfileImage from '../../atoms/ProfileImage';
import ColumnContainer from '../../atoms/ColumnContainer';
import ScrapNaviagtion from './ScrapNaviagtion';
import { useModal } from '@/hooks/useModal';

interface MobileNavbarProps {
  toggleMobileNavbar: () => void;
}

function MobileNavbar({ toggleMobileNavbar }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  };

  const navigate = useNavigate();

  const login = () => {
    openModal('login');
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

  const isLogin = localStorage.getItem('token') ? true : false;
  const profileImageURL = localStorage.getItem('profileImageURL');

  return (
    <NavbarContainer>
      <div
        onClick={toggleMobileNavbar}
        style={{
          width: '100%',
          position: 'absolute',
          top: '15px',
          left: '15px',
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
      </Box>

      <NavbarMenu>
        {navbarMenus.map(menu => {
          const isMenuVisible = menu.isVisibleWithoutLogin || isLogin;
          const isMenuHasMenuAndOpen = menu.isMenuOpen && isMenuOpen && isLogin;
          return (
            <>
              {
                isMenuVisible &&
                <ColumnContainer
                  style={{
                    gap: '16px',
                  }}
                >
                  <ItemContainer>
                    <div onClick={menu.onclick}>
                      <Typography
                        variant='h3'
                        color={theme.color.Gray_090}
                        sx={{
                          fontWeight: '600',
                        }}
                      >
                        {menu.name}
                      </Typography>
                    </div>
                    {menu.isMenuOpen &&
                      <div
                        onClick={toggleMenu}
                        style={{
                          transform: isMenuOpen ? 'rotate(180deg)' : '',
                        }}
                      >
                        <DownArrowIcon width='24' height='24' fill={theme.color.Gray_090} />
                      </div>}
                  </ItemContainer>
                  {
                    isMenuHasMenuAndOpen &&
                    <MenuContainer>
                      <ScrapNaviagtion />
                    </MenuContainer>
                  }
                </ColumnContainer>
              }
            </>
          )
        })}
        <Typography
          variant='h3'
          color={theme.color.Gray_090}
          sx={{
            fontWeight: '600',
            cursor: 'pointer',
          }}
          onClick={isLogin ? logout : login}
        >
          {isLogin ? '로그아웃' : '로그인/회원가입'}
        </Typography>
      </NavbarMenu>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  min-width: 285px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 49px 32px;
  box-sizing: border-box;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 34px;
`

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export default MobileNavbar;
