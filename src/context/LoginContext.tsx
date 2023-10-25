import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLogout } from "@/hooks/useAccount";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";

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

    return <LoginContext.Provider value={userInformation}>{children}</LoginContext.Provider>;
}

export function useLoginState() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('Cannot find LoginProvider');
    }

    return context;
}

function verifyToken(token: string | null) {
    if (!token) {
        return false;
    }

    const tokenData = JSON.parse(atob(token.split('.')[1]));

    if (tokenData.exp) {
        const expirationDate = new Date(tokenData.exp * 1000);
        const currentDate = new Date();

        return expirationDate > currentDate;
    }

    return false;
}

export async function useHandleUnVerifiedTokenUser() {
    const logout = useLogout();
    await useDefaultSnackbar('다시 로그인해주세요.', 'error');
    logout();
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    !verifyToken(token) && useHandleUnVerifiedTokenUser();

    return token ? (
        children
    ) : (
        <Navigate to={"/main"} replace state={{ path: location.pathname }}></Navigate>
    )
}
