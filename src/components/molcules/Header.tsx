import styled, { css } from 'styled-components';
import logo from '../../assets/images/dadamda-logo128.png';
import theme from '../../assets/styles/theme';
import MenuIcon from '../../assets/icons/MenuIcon.png';
import Button from '../atoms/DefaultButton';
import { useState } from 'react';
import MobileNavbar from './MobileNavbar';
import { USER } from '../../config';
import { Link } from 'react-router-dom';
import LoginModal from '../organisms/LoginModal';

interface HeaderProps {
    user: object;
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

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    }

    const hideLoginModal = () => {
        setIsLoginModalVisible(false);
        console.log("no");
    }

    return (
        <HeaderContainer>
            <LogoContainer src={logo} />
            <HeaderPanel>
                {headerPanelMenus.map(menu => {
                    const isVisible = props.user || menu.isVisibleWithoutLogin;
                    return isVisible && <Link to={menu.link}><Button buttonStyle='text-only' label={menu.name} /></Link>
                })}
            </HeaderPanel>
            <LargeRightPanel>
                {props.user ?
                    <Link to={'/user'}><AvatarContainer src={props.user.profile_url} /></Link> :
                    <Button buttonStyle='text-only' label={"로그인/회원가입"} onClick={showLoginModal} />
                }
            </LargeRightPanel>
            <IconContainer onClick={toggleMobileNavbar} src={!isClicked && MenuIcon} />
            {isClicked && <MobileNavbar toggleMobileNavbar={toggleMobileNavbar} user={''} />}
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
