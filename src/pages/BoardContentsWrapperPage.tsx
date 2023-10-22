import { RequireAuth } from "@/context/LoginContext";
import BoardInfoPage from "@/pages/BoardInfoPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OpenBoardPage from "@/pages/OpenBoardPage";
import { useSearchParams } from "react-router-dom";

function BoardContentsWrapperPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function hasBoardStateInURL() {
        return searchParams.has('bs');
    }

    function isBoardStateShared() {
        return searchParams.get('bs') === 'shared';
    }

    return hasBoardStateInURL()
        ? (isBoardStateShared() ? <OpenBoardPage /> : <NotFoundPage />)
        : (
            <RequireAuth>
                <BoardInfoPage />
            </RequireAuth>
        );
}

export default BoardContentsWrapperPage;
