import UserImage from "@/components/molcules/UserPage/UserImage";
import UserImageChangeWrapper from "@/components/molcules/UserPage/UserImageChangeWrapper";
import { useIsUserPageViewMode } from "@/pages/UserPage";

function UserImageByModeWrapper({ profileUrl, mode, changeModeIntoView }: { profileUrl?: string, mode: string, changeModeIntoView: () => void }) {
    if (useIsUserPageViewMode(mode)) {
        return <UserImage profileUrl={profileUrl} />
    }

    return (
        <UserImageChangeWrapper profileUrl={profileUrl} changeModeIntoView={changeModeIntoView} />
    );
}

export default UserImageByModeWrapper;
