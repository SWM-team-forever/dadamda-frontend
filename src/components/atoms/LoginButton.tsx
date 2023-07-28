import styled from 'styled-components';
import IconButton from './IconButton';
import theme from '../../assets/styles/theme';

interface LoginButtonProps {
    text?: string,
    iconSource: string,
    onClick?: () => void,
    style: object,
}

function LoginButton({ text, iconSource, onClick, style }: LoginButtonProps) {
    return (
        <LoginButtonContainer onClick={onClick} style={style}>
            <IconButton src={iconSource} style={{ width: '46px', height: '46px' }} />
            <span style={{ flex: '1', textAlign: 'center' }}>{text}</span>
        </LoginButtonContainer>
    );
}

const LoginButtonContainer = styled.div<{ style: object }>`
    display: flex;
    background-color: ${props => props.style.backgroundColor};
    color: ${props => props.style.color};
    font-size: 16px;
    box-shadow: ${theme.style.shadow};
    border-radius: 4px;
    border: ${theme.color.selected_gray_color} solid 1px;
    box-sizing: border-box;
    align-items: center;
    font-weight: bold;
    padding: 5px;
`

export default LoginButton;
