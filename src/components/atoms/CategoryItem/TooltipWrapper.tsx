import { Box } from '@mui/material';

import { ScrapCardSeeMoreIcon } from '../Icon';
import { useTooltip } from '@/hooks/useTooltip';
import { ITooltipAtom } from '@/types/ITooltipAtom';
import TooltipElement from '@/components/atoms/CategoryItem/TooltipElement';
import React from 'react';

export default function TooltipWrapper({ menu }: Partial<ITooltipAtom>) {
    const { tooltip, openTooltip } = useTooltip();

    return (
        <Box>
            <Box
                sx={{
                    width: '16px',
                    height: '16px',
                }}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    menu && openTooltip(menu, e.currentTarget);
                }}>
                <ScrapCardSeeMoreIcon width='16' height='16' fill='#24292E' />
            </Box>
            {tooltip.isOpen && <TooltipElement />}
        </Box>
    );
}
