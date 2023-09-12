import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import { GET_USER_PROFILE_IMAGE } from "../secret";

import RowContainer from "../components/atoms/RowContainer";

function GoogleOAuthLoginpage() {
    const navigate = useNavigate();

    function getUserProfileImage(token: string) {
        return fetch(GET_USER_PROFILE_IMAGE, {
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
        })
            .then(data => (data.data.profileUrl))
    }

    useEffect(() => {
        const token = new URL(window.location.href).searchParams.get("token");
        token && localStorage.setItem('token', token);
        token && getUserProfileImage(token)
            .then(userProfileImage => localStorage.setItem('profileImageURL', userProfileImage))
        return navigate('/scrap/list');
    }, [navigate])
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

export default GoogleOAuthLoginpage;
