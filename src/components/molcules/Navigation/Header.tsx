import styled from 'styled-components';
import { useState } from 'react';
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import LoginModal from '../../organisms/LoginModal';
import MobileNavbar from './MobileNavbar';
import ProfileImage from '../../atoms/ProfileImage';
import { LogoTextIcon, ProfileIcon } from '../../atoms/Icon';
import { MenuIcon } from '../../atoms/Icon';
import Overlay from '../../atoms/Overlay';

import logo from '../../../assets/icons/dadamda-logo128.png';
import theme from '../../../assets/styles/theme';

const headerPanelMenus = [{
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
    name: '스크랩북',
    link: '/scrap/list',
}];

function Header() {
    const isLogin = localStorage.getItem('token') ? true : false;
    const profileImageURL = localStorage.getItem('profileImageURL');
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [isClicked, setIsClicked] = useState(false);
    const toggleMobileNavbar = () => setIsClicked(!isClicked);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const navigate = useNavigate();

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    }

    const hideLoginModal = () => {
        setIsLoginModalVisible(false);
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/main');
        handleCloseUserMenu();
    }

    const userPopOverMenus = [{
        name: '프로필 정보',
        onClick: () => {
            navigate('/user');
            handleCloseUserMenu();
        },
    }, {
        name: '로그아웃',
        onClick: logout,
    }]

    function ActiveLink(props: NavLinkProps) {
        return <NavLink
            style={({ isActive }) => {
                return {
                    padding: '5px 12px',
                    textDecoration: 'none',
                    lineHeight: '100px',
                    color: isActive ? theme.color.Blue_080 : theme.color.Gray_080,
                    fontSize: '13px',
                }
            }}
            {...props}
        />
    }

    return (
        <>
            <HeaderContainer>
                <LogoContainer onClick={() => navigate('/main')}>
                    <img src={logo} alt='logo' width='32px' height='30px' />
                    <LogoTextIcon width='49.185px' height='16px' />
                </LogoContainer>
                <HeaderPanel>
                    {headerPanelMenus.map(menu => {
                        const isVisible = isLogin || menu.isVisibleWithoutLogin;
                        return isVisible && <ActiveLink to={menu.link}>{menu.name}</ActiveLink>
                    })}
                </HeaderPanel>
                <LargeRightPanel>
                    {isLogin ?
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                                {profileImageURL
                                    ? <ProfileImage source={profileImageURL} size={24} />
                                    : <ProfileIcon size='24' />
                                }
                            </IconButton>
                            <Menu
                                sx={{
                                    '& .MuiPaper-root': {
                                        boxShadow: 'none',
                                        padding: '6px',
                                    },
                                    '& .MuiList-root': {
                                        padding: '0px',
                                    },
                                    mt: '45px',
                                    fill: '#FFF',
                                    filter: 'drop-shadow(0px 2px 16px rgba(19, 48, 74, 0.08))',
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {userPopOverMenus.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={setting.onClick}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#F3F7FE',
                                            },
                                            padding: '6px 8px',
                                            color: theme.color.Blue_dry,
                                        }}>
                                        <Typography textAlign="center" variant='h5'>{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        : <Typography
                            variant='h5'
                            color={theme.color.Gray_080}
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                cursor: 'pointer',
                            }}
                            onClick={showLoginModal}>
                            로그인/회원가입
                        </Typography>
                    }
                </LargeRightPanel>
                {!isClicked &&
                    <Box sx={{
                        display: { xs: 'block', sm: 'none' },
                    }}
                        onClick={toggleMobileNavbar}>
                        <MenuIcon width='20' height='14' fill='#202C3F' />
                    </Box>}
            </HeaderContainer>
            {isClicked &&
                <Box sx={{
                    display: { xs: 'block', sm: 'none' },
                }}>
                    <MobileNavbar toggleMobileNavbar={toggleMobileNavbar} />
                </Box>}
            {isLoginModalVisible &&
                <Overlay>
                    <LoginModal hideLoginModal={hideLoginModal} />
                </Overlay>}
        </>
    );
}

const HeaderContainer = styled.div`
    height: 56px;
    width: 100%;
    padding: 13px 24px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.40);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    position: static;
`
const LogoContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
`

const HeaderPanel = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    @media screen and (max-width: 600px) {
      display: none;
  }
`

const LargeRightPanel = styled.div`
  @media screen and (max-width: 600px) {
      display: none;
  }
`

export default Header;
