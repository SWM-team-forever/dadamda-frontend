import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetToken, useLogout, useVerifyToken } from "@/hooks/useAccount";
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

    return <LoginContext.Provider value={userInformation}>{children}</LoginContext.Provider>;
}

export function useLoginState() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('Cannot find LoginProvider');
    }

    return context;
}

export async function useHandleUnVerifiedTokenUser() {
    const logout = useLogout();
    await useDefaultSnackbar('다시 로그인해주세요.', 'error');
    logout();
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const token = useGetToken();
    const location = useLocation();

    return token ? (
        children
    ) : (
        <Navigate to={"/main"} replace state={{ path: location.pathname }}></Navigate>
    )
}
