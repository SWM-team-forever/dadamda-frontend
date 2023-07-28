import styled from 'styled-components';
import theme from '../../assets/styles/theme';

interface ButtonProps {
    buttonStyle: 'primary' | 'secondary' | 'gray' | 'text-only',
    label: string;
    isRound?: boolean;
    endIcon?: string;
    startIcon?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large',
    onClick?: () => void;
}

const sizeMapping = {
    'small': 12,
    'medium': 24,
    'large': 36,
}

function Button({ label, buttonStyle, isRound, fullWidth, onClick, startIcon, endIcon, size,
}: ButtonProps) {
    return (
        <ButtonContainer buttonStyle={buttonStyle} fullWidth={fullWidth} isRound={isRound} onClick={onClick} size={size}>
            {startIcon && <Icon src={startIcon} size={size} />}
            {label}
            {endIcon && <Icon src={endIcon} size={size} />}
        </ButtonContainer>
    );
}

const ButtonContainer = styled.button<{ buttonStyle: string, fullWidth?: boolean, isRound?: boolean, size?: string }>`
    ${props => getButtonStyle(props.buttonStyle)};
    ${props => props.fullWidth && 'width: 100%'};
    ${props => props.isRound && 'border-radius: 4px'};
    border: none;
    cursor: pointer;
    padding: 5px 12px;
    ${props => props.size && getFontSize(props.size)};
    display: flex;
    justify-content: center;
    align-itmes: center;
`

const getButtonStyle = (buttonStyle: string) => {
    switch (buttonStyle) {
        case 'primary':
            return `
                background-color: ${theme.color.primary_color};
                color: white;
`
        case 'secondary':
            return `
    background-color: ${theme.color.secondary_color};
                color: ${theme.color.text_gray_color};
`
        case 'gray':
            return `
                background-color: theme.color.primary_color;
                color: ${theme.color.text_gray_color};
`
        case 'text-only':
            return `
                background-color: transparent;
    color: ${theme.color.text_gray_color};
`
    }
}

const getIconSize = (size: string | undefined) => {
    switch (size) {
        case 'small':
            return `
            width: 12px;
            height: 12px;
            `;
        case 'medium':
            return `
            width: 24px;
            height: 24px;
            `;
        case 'large':
            return `
            width: 36px;
            height: 36px;
            `
    }
}

const getFontSize = (size: string) => {
    switch (size) {
        case 'small':
            return `
            font-size: 12px;
            `;
        case 'medium':
            return `
            font-size: 24px;
            `;
        case 'large':
            return `
            font-size: 36px;
            `
    }
}

const Icon = styled.img<{ size?: string }>`
    ${props => getIconSize(props.size)}
`

export default Button;
