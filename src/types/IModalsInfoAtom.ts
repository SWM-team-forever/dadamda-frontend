interface ICustomModalInfo {
    title: string,
    isOpen: boolean,
    element: React.ReactNode,
    callback?: () => void,
}

export type {ICustomModalInfo};
