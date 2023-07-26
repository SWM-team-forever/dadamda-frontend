import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import theme from "../../assets/styles/theme";

interface TooltipProps {
    contents: {
        link?: string,
        onClick: () => void,
        name: string,
        color: string,
    }[];
    color: string;
}

function Tooltip({ contents, color }: TooltipProps) {
    return (
        <TooltipWrapper color={color}>
            {contents.map(menu => {
                return <HoverLink to={menu.link} onClick={menu.onClick}>{menu.name}</HoverLink>
            })}
        </TooltipWrapper>
    );
}

const TooltipWrapper = styled.div<{ color: string }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 102%;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 4px;
    background: ${props => props.color};
    text-align: center;
    color: ${theme.color.text_gray_color};
    box-shadow: ${theme.style.shadow};
    z-index: 1;
    gap: 10px;
`

const HoverLink = styled(NavLink)`
    text-decoration: none;
    &:hover {
        color: ${theme.color.primary_color};
    } 
    color: ${theme.color.text_gray_color};
    font-size: 12px;
`

export default Tooltip;
