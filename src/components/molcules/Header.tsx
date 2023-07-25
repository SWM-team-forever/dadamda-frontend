import styled from 'styled-components';
import { useState } from 'react';
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';

import LoginModal from '../organisms/LoginModal';
import Button from '../atoms/DefaultButton';
import UserConsumer from '../../context/UserContext';
import ProfileImage from '../atoms/ProfileImage';
import MobileNavbar from './MobileNavbar';

import logo from '../../assets/images/dadamda-logo128.png';
import theme from '../../assets/styles/theme';
import MenuIcon from '../../assets/icons/MenuIcon.png';
import Tooltip from '../atoms/Tooltip';

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
    const [user, dispatch] = UserConsumer() as any;
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
        dispatch({ type: 'logout' });
        navigate('/main');
        hideLoginTooltip();
    }

    const userPopOverMenus = [{
        name: '프로필 정보',
        link: '/user',
        onClick: hideLoginTooltip,
    }, {
        name: '로그아웃',
        link: '/main',
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

    return (
        <HeaderContainer>
            <LogoContainer src={logo} />
            <HeaderPanel>
                {headerPanelMenus.map(menu => {
                    const isVisible = user || menu.isVisibleWithoutLogin;
                    return isVisible && <ActiveLink to={menu.link}>{menu.name}</ActiveLink>
                })}
            </HeaderPanel>
            <LargeRightPanel>
                {user ?
                    <ProfileImage source={user.profile_url} size={24} onClick={showLoginTooltip} /> :
                    <Button buttonStyle='text-only' label={"로그인/회원가입"} onClick={showLoginModal} />
                }
            </LargeRightPanel>
            <IconContainer onClick={toggleMobileNavbar} src={!isClicked && MenuIcon} />
            {isClicked && <MobileNavbar toggleMobileNavbar={toggleMobileNavbar} />}
            {isLoginModalVisible && <LoginModal hideLoginModal={hideLoginModal} />}
            {isLoginTooltipVisible && <Tooltip contents={userPopOverMenus} />}
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    height: 50px;
    width: 100vw;
    padding: 0 15px;
    box-shadow: ${theme.style.shadow};
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    position: fixed;
`
const LogoContainer = styled.img`
    height: 24px;
    width: auto;
    cursor: pointer;
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
