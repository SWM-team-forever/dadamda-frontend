import { createContext, useContext, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const userProfileImage = localStorage.getItem('userProfileImage');
const token = localStorage.getItem('token');

export const LoginContext = createContext({
    profileImageURL: localStorage.getItem('profileImageURL'),
    token: localStorage.getItem('token'),
});

export function LoginProvider({ children }: { children: React.ReactNode }) {
    const [userInformation, setUserInformation] = useState({
        profileImageURL: localStorage.getItem('profileImageURL'),
        token: localStorage.getItem('token'),
    });

    // const value: any = useMemo(() => ({ userInformation, setUserInformation }), [userInformation, setUserInformation]);

    return <LoginContext.Provider value={[userInformation, setUserInformation]}>{children}</LoginContext.Provider>;
}

export function useLoginState() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('Cannot find LoginProvider');
    }

    return context;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { profileImageURL, token } = useLoginState();
    const location = useLocation();

    return token ? (
        children
    ) : (
        <Navigate to={"/"} replace state={{ path: location.pathname }}></Navigate>
    )
}
