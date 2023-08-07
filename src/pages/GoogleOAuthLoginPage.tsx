import RowContainer from "../components/atoms/RowContainer";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_USER_PROFILE_IMAGE } from "../secret";

interface GoogleOAuthLoginPageProps {
    setError: Dispatch<SetStateAction<Partial<null | string>>>,
}

function GoogleOAuthLoginpage({ setError }: GoogleOAuthLoginPageProps) {
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
            .catch(err => setError(err.message));
    }

    useEffect(() => {
        const token = new URL(window.location.href).searchParams.get("token");
        // const [userInformation, setUserInformation] = useContext(LoginContext);
        // setUserInformation({
        //     profileImageURL: null,
        //     token: token,
        // });
        token && localStorage.setItem('token', token);
        token && getUserProfileImage(token)
            .then(userProfileImage => localStorage.setItem('profileImageURL', userProfileImage))
            .catch(error => setError(error.message));
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

export default GoogleOAuthLoginpage
