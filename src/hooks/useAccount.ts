import { useNavigate } from "react-router-dom";

import { logEvent } from "@/utility/amplitude";

export const HAS_NO_ACCESS_ERROR = 'HAS_NO_ACCESS_ERROR';

export function useLogout() {
    const navigate = useNavigate();
    logEvent('logout');
    return () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profileImageURL');
        navigate('/main');
    }
}

function getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
}

function isTokenExpired(token: string) {
    const tokenData = getDecodedToken(token);

    if (tokenData.exp) {
        const expirationDate = new Date(tokenData.exp * 1000);
        const currentDate = new Date();

        return expirationDate >= currentDate;
    }

    return true;
}

export function useVerifyToken(token: string | null) {
    if (!token || !isTokenExpired(token)) {
        throw new Error(HAS_NO_ACCESS_ERROR);
    }
}

export function useGetToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error(HAS_NO_ACCESS_ERROR);
    }
    
    useVerifyToken(token);

    return token;
}
