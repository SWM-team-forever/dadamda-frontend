import UserImage from "@/components/molcules/UserPage/UserImage";
import UserImageChangeWrapper from "@/components/molcules/UserPage/UserImageChangeWrapper";
import { useIsUserPageViewMode } from "@/pages/UserPage";

function UserImageByModeWrapper({ profileUrl, mode }: { profileUrl?: string, mode: string }) {
    if (useIsUserPageViewMode(mode)) {
        return <UserImage profileUrl={profileUrl} />
    }

    return (
        <UserImageChangeWrapper profileUrl={profileUrl} />
    );
}

export default UserImageByModeWrapper;
