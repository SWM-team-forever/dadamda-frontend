interface ICustomModalInfo {
    title: string,
    isOpen: boolean,
    element: React.ReactNode,
    callback?: () => void,
    scrapId?: number,
}

export type {ICustomModalInfo};
