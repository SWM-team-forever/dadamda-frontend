import { useGetToken } from "@/hooks/useAccount";
import { POST_CREATE_OTHER_SCRAP_URL } from "@/secret";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShareTarget() {
    const parsedUrl = new URL(window.location.toString());
    const token = useGetToken();
    const url = parsedUrl.searchParams.get('url');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('url in share target page', url);
        fetch(POST_CREATE_OTHER_SCRAP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            },
            body: JSON.stringify({
                pageUrl: url,
            }),
        }).then((response) => {
            return response.json().then((body) => {
                if (response.ok) {
                    return body;
                } else {
                    throw new Error(body.resultCode);
                }
            });
        });
        navigate('/');
    }, [])

    return (
        <div>
        </div>
    )
}

export default ShareTarget
