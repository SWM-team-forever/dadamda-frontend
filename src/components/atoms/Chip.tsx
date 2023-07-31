import styled from 'styled-components';

import theme from '../../assets/styles/theme';
import React from 'react';

interface ChipProps {
    children: React.ReactNode,
}

function Chip({ children }: ChipProps) {
    return (
        <ChipWrapper>
            {children}
        </ChipWrapper>
    );
}

const ChipWrapper = styled.div`
    border-radius: 15px;
    background-color: ${theme.color.primary_color};
    color: ${theme.color.background_color};
    font-size: 12px;
    width: fit-content;
    padding: 5px 10px;
`

export default Chip;
