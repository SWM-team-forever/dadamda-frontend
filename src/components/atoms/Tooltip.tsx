import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import theme from "../../assets/styles/theme";

interface TooltipProps {
    contents: {
        link: string,
        onClick: () => void,
        name: string,
    }[]
}

function Tooltip({ contents }: TooltipProps) {
    return (
        <TooltipWrapper>
            {contents.map(menu => {
                return <HoverLink to={menu.link} onClick={menu.onClick}>{menu.name}</HoverLink>
            })}
        </TooltipWrapper>
    );
}

const TooltipWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    background: white;
    text-align: center;
    color: ${theme.color.text_gray_color};
    box-shadow: ${theme.style.shadow};
    z-index: 1;
    gap: 10px;
`

const HoverLink = styled(NavLink)`
    padding: 5px 12px;
    text-decoration: none;
    &:hover {
        color: ${theme.color.primary_color};
    } 
    color: ${theme.color.text_gray_color};
`

export default Tooltip;
