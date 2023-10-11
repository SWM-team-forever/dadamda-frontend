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
        return true; // 토큰이 존재하지 않는 경우, 만료로 간주
    }

    const tokenData = JSON.parse(atob(token.split('.')[1])); // JWT 디코딩

    if (tokenData.exp) {
        const expirationDate = new Date(tokenData.exp * 1000); // JWT의 만료 시간 (밀리초)
        const currentDate = new Date();

        return expirationDate < currentDate; // 만료 시간과 현재 시간 비교
    }

    return true; // "exp" 클레임이 없는 경우, 만료로 간주
}

async function useHandleUnVerifiedTokenUser() {
    const logout = useLogout();
    await useDefaultSnackbar('로그인이 만료되었습니다. 다시 로그인해주세요.', 'error');
    logout();
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    verifyToken(token) && useHandleUnVerifiedTokenUser();

    return token ? (
        children
    ) : (
        <Navigate to={"/main"} replace state={{ path: location.pathname }}></Navigate>
    )
}
