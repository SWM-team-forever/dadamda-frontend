import { createContext, useContext, useReducer } from "react"
import { Navigate, useLocation } from "react-router-dom";

import { USER } from "../config";

const initialUserState: null | object = null;

const userContext = createContext<null | object>(initialUserState);

type State = {
    user: null | object;
}

type Action =
    | { type: 'login'; }
    | { type: 'logout'; };

export function reducer(_state: State, action: Action): any {
    switch (action.type) {
        case 'login':
            return USER;
        case 'logout':
            return null;
        default:
            return null;
    }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, dispatch] = useReducer(reducer, initialUserState);
    return <userContext.Provider value={[user, dispatch]}>{children}</userContext.Provider>;
}

export default function UserConsumer() {
    return useContext(userContext);
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const [user] = UserConsumer() as any;
    const location = useLocation();

    return user ? (
        children
    ) : (
        <Navigate to={"/"} replace state={{ path: location.pathname }}></Navigate>
    )
}