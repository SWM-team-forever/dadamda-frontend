import styled from 'styled-components';
import { useState } from 'react';
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';

import LoginModal from '../organisms/LoginModal';
import Button from '../atoms/DefaultButton';
import ProfileImage from '../atoms/ProfileImage';
import MobileNavbar from './MobileNavbar';

import logo from '../../assets/icons/dadamda-logo128.png';
import theme from '../../assets/styles/theme';
import MenuIcon from '../../assets/icons/MenuIcon.png';
import Overlay from '../atoms/Overlay';
import { LogoTextIcon, ProfileIcon } from '../atoms/Icon';
import { Box, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material';

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
    const [isClicked, setIsClicked] = useState(false);
    const toggleMobileNavbar = () => setIsClicked(!isClicked);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isLoginTooltipVisible, setIsLoginTooltipVisible] = useState(false);
    const navigate = useNavigate();

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    }

    const hideLoginModal = () => {
        setIsLoginModalVisible(false);
    }

    const showLoginTooltip = () => {
        setIsLoginTooltipVisible(true);
    }

    const hideLoginTooltip = () => {
        setIsLoginTooltipVisible(false);
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/main');
        hideLoginTooltip();
    }

    const userPopOverMenus = [{
        name: '프로필 정보',
        onClick: () => {
            navigate('/user');
            hideLoginTooltip();
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
                    color: isActive ? theme.color.primary_color : theme.color.text_gray_color,
                }
            }}
            {...props}
        />
    }

    const isLogin = localStorage.getItem('token') ? true : false;
    const profileImageURL = localStorage.getItem('profileImageURL');
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    return (
        <HeaderContainer>
            <LogoContainer>
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
                    (profileImageURL ?
                        <ProfileImage source={profileImageURL} size={24} onClick={showLoginTooltip} />
                        : <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <ProfileIcon size='24' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                            >
                                {userPopOverMenus.map((setting) => (
                                    <MenuItem key={setting.name}>
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) :
                    <Button buttonStyle='text-only' label={"로그인/회원가입"} onClick={showLoginModal} />
                }
            </LargeRightPanel>
            {!isClicked && <IconContainer onClick={toggleMobileNavbar} src={MenuIcon} />}
            {isClicked && <MobileNavbar toggleMobileNavbar={toggleMobileNavbar} />}
            {isLoginModalVisible && <Overlay>
                <LoginModal hideLoginModal={hideLoginModal} />
            </Overlay>}
        </HeaderContainer>
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

const IconContainer = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    @media screen and (min-width: 600px) {
      display: none;
  }
`

export default Header;
