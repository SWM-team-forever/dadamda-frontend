import { createContext, useContext, useReducer } from "react"
import { USER } from "../config";
import { Navigate, useLocation } from "react-router-dom";

const initialUserState = null;

const userContext = createContext(initialUserState);

export function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return USER;
        case 'logout':
            return null;
        default:
            throw new Error();
    }
}

export function UserProvider({ children }) {
    const [user, dispatch] = useReducer(reducer, initialUserState);
    return <userContext.Provider value={[user, dispatch]}>{children}</userContext.Provider>;
}

export default function UserConsumer() {
    return useContext(userContext);
}

export function RequireAuth({ children }) {
    const [authed] = UserConsumer();
    const location = useLocation();

    return authed ? (
        children
    ) : (
        <Navigate to={"/"} replace state={{ path: location.pathname }}></Navigate>
    )
}