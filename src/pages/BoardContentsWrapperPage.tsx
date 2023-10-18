import { RequireAuth } from "@/context/LoginContext";
import BoardInfoPage from "@/pages/BoardInfoPage";

function BoardContentsWrapperPage() {
    return (
        <RequireAuth>
            <BoardInfoPage />
        </RequireAuth>
    );
}

export default BoardContentsWrapperPage;
