interface ICustomModalInfo {
    type: 'custom',
    element: JSX.Element,
}

interface IModalInfo { 
    config: ICustomModalInfo;
}

interface IModalsInfoAtom {
    modals: IModalInfo[];
}

export default IModalsInfoAtom;
export type {IModalInfo, ICustomModalInfo};
