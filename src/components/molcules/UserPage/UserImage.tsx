import { ProfileIcon } from "@/components/atoms/Icon";
import { Box } from "@mui/material";

function UserImage({ profileUrl }: { profileUrl?: string }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '-25%',
            }}
        >
            {
                profileUrl
                    ? <img
                        src={profileUrl}
                        alt="프로필 이미지"
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '100%',
                        }}
                        className="profile-image"
                    />
                    : <Box
                        className="profile-image"
                    >
                        <ProfileIcon size="200" />
                    </Box>
            }
        </Box>
    );
}

export default UserImage;
