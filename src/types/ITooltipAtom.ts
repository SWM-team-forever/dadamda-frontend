interface ITooltipAtom {
    isOpen: boolean,
    menu?: {
        title: string,
        clickAction: (e: React.MouseEvent<HTMLElement>) => void,
    }[],
    anchorEl?: HTMLElement,
    scrapId?: number,
}

export type {ITooltipAtom};
