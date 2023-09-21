import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';

import { ScrapCardSeeMoreIcon } from '../Icon';
import { useTooltip } from '@/hooks/useTooltip';
import { ITooltipAtom } from '@/types/ITooltipAtom';

import TooltipElement from '@/components/atoms/CategoryItem/TooltipElement';
import { useModal } from '@/hooks/useModal';

export default function TooltipWrapper({ menu, scrapId }: Partial<ITooltipAtom>) {
    const { tooltip, openTooltip } = useTooltip();
    const openTooltipButtonIconRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const { modal, connectMemoWithScrapId } = useModal();

    const handleOpenTooltip = () => {
        scrapId && connectMemoWithScrapId(scrapId);
        (menu && openTooltipButtonIconRef.current) && openTooltip(menu, openTooltipButtonIconRef.current);
    }

    return (
        <Box>
            <Box
                sx={{
                    width: '16px',
                    height: '16px',
                }}
                ref={openTooltipButtonIconRef}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    setIsClicked(openTooltipButtonIconRef.current === e.currentTarget)
                    handleOpenTooltip();
                }}
            >
                <ScrapCardSeeMoreIcon width='16' height='16' fill='#24292E' />
            </Box>
            {(tooltip.isOpen && isClicked) && <TooltipElement />}
        </Box>
    );
}
