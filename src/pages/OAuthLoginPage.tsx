import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import { GET_USER_PROFILE_IMAGE } from "../secret";

import RowContainer from "../components/atoms/RowContainer";
import { logEvent } from "@/utility/amplitude";
import { HAS_NO_ACCESS_ERROR } from "@/hooks/useAccount";

function OAuthLoginpage() {
    const navigate = useNavigate();

    async function getUserProfileImage(token: string) {
        return await fetch(GET_USER_PROFILE_IMAGE, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            },
        }).then((response) => {
            return response.json().then(body => {
                if (response.ok) {
                    return body;
                } else {
                    throw new Error(body.resultCode);
                }
            })
        }).then(data => (data.data.profileUrl))
    }

    useEffect(() => {
        const token = new URL(window.location.href).searchParams.get("token");
        if (!token) {
            throw new Error(HAS_NO_ACCESS_ERROR);
        }

        localStorage.setItem('token', token);
        getUserProfileImage(token)
            .then(userProfileImage => localStorage.setItem('profileImageURL', userProfileImage))
        logEvent('login');
        return navigate('/scrap/list');
    }, [])
    return (
        <RowContainer style={{
            width: '100vw',
            height: 'calc(100vh - 50px)',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress />
        </RowContainer>
    )
}

export default OAuthLoginpage;
