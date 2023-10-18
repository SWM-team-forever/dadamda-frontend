interface ICustomModalInfo {
    title: string,
    isOpen: boolean,
    element: React.ReactNode,
    callback?: () => void,
    scrapId?: number,
    position: string,
}

export type {ICustomModalInfo};
