import styled from 'styled-components';
import theme from '../../assets/styles/theme';

interface ButtonProps {
    buttonStyle: 'primary' | 'secondary' | 'gray' | 'text-only',
    label: string;
    isRound?: boolean;
    endIcon?: React.ReactElement;
    startIcon?: React.ReactElement;
    fullWidth?: boolean;
    variant?: string;
    color?: string;
    size?: string;
    onClick?: () => void;
}

function Button({ label, buttonStyle, isRound, fullWidth, onClick
}: ButtonProps) {
    return (
        <ButtonContainer buttonStyle={buttonStyle} fullWidth={fullWidth} isRound={isRound} onClick={onClick}>
            {label}
        </ButtonContainer>
    );
}

const ButtonContainer = styled.button<{ buttonStyle: string, fullWidth?: boolean, isRound?: boolean }>`
    ${props => getButtonStyle(props.buttonStyle)};
    ${props => props.fullWidth && 'width: 100%'};
    ${props => props.isRound && 'border-radius: 4px'};
    border: none;
    cursor: pointer;
    padding: 5px 12px;
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

export default Button;
