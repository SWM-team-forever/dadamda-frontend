interface ITooltipAtom {
    isOpen: boolean,
    menu?: {
        title: string,
        clickAction: (e: React.MouseEvent<HTMLElement>) => void,
    }[],
    anchorEl?: HTMLElement,
}

export type {ITooltipAtom};
