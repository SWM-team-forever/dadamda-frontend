import styled from 'styled-components';
import logo from '../../assets/images/dadamda-logo128.png';
import theme from '../../assets/styles/theme';
import MenuIcon from '../../assets/icons/MenuIcon.png';
import Button from '../atoms/DefaultButton';
import { useContext, useState } from 'react';
import MobileNavbar from './MobileNavbar';
import { NavLink } from 'react-router-dom';
import LoginModal from '../organisms/LoginModal';
import UserConsumer, { UserContext } from '../../context/UserContext';

interface HeaderProps {
    size: 'small' | 'large';
}

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
    link: '/scrap',
}];

function Header({
    ...props
}: HeaderProps) {
    const [isClicked, setIsClicked] = useState(false);
    const toggleMobileNavbar = () => setIsClicked(!isClicked);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [user, dispatch] = UserConsumer();
    console.log(user);

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    }

    const hideLoginModal = () => {
        setIsLoginModalVisible(false);
    }

    function ActiveLink(props) {
        // const NavLinkStyle = {
        //     padding: '5px 12px',
        //     props.isActive ? theme.color.primary_color : theme.color.text_gray_color,
        // }

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
                    <ActiveLink to={'/user'}><AvatarContainer src={user.profile_url} /></ActiveLink> :
                    <Button buttonStyle='text-only' label={"로그인/회원가입"} onClick={showLoginModal} />
                }
            </LargeRightPanel>
            <IconContainer onClick={toggleMobileNavbar} src={!isClicked && MenuIcon} />
            {isClicked && <MobileNavbar toggleMobileNavbar={toggleMobileNavbar} />}
            {isLoginModalVisible && <LoginModal hideLoginModal={hideLoginModal} />}
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    height: 50px;
    width: 100vw;
    padding: 15px 20px;
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

const AvatarContainer = styled.img`
    height: 24px;
    width: 24px;
    cursor: pointer;
    border-radius: 100%;
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
