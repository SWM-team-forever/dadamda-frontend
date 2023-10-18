import { RequireAuth } from "@/context/LoginContext";
import BoardInfoPage from "@/pages/BoardInfoPage";
import { useSearchParams } from "react-router-dom";

function BoardContentsWrapperPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function hasBoardStateInURL() {
        return searchParams.has('bs');
    }

    return (
        <RequireAuth>
            <BoardInfoPage />
        </RequireAuth>
    );
}

export default BoardContentsWrapperPage;
