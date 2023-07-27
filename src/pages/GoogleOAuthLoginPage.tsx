import RowContainer from "../components/atoms/RowContainer";
import { useContext, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function GoogleOAuthLoginpage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URL(window.location.href).searchParams.get("token");
        // const [userInformation, setUserInformation] = useContext(LoginContext);
        // setUserInformation({
        //     profileImageURL: null,
        //     token: token,
        // });
        localStorage.setItem('token', token)
        navigate('/scrap');
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

export default GoogleOAuthLoginpage
