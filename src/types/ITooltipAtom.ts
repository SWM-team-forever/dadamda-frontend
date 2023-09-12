interface ITooltipAtom {
    isOpen: boolean,
    menu?: {
        title: string,
        clickAction: (e: React.MouseEvent<HTMLElement>) => void,
    }
}

export type {ITooltipAtom};
