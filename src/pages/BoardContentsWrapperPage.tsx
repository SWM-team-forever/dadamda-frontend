import { RequireAuth } from "@/context/LoginContext";
import BoardInfoPage from "@/pages/BoardInfoPage";
import OpenBoardPage from "@/pages/OpenBoardPage";
import { useSearchParams } from "react-router-dom";

function BoardContentsWrapperPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function hasBoardStateInURL() {
        return searchParams.has('bs');
    }

    return hasBoardStateInURL()
        ? <OpenBoardPage />
        : (
            <RequireAuth>
                <BoardInfoPage />
            </RequireAuth>
        );
}

export default BoardContentsWrapperPage;
