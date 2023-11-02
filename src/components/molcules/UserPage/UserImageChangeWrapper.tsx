import { grayOutlinedButtonStyle, grayFullfilledButtonStyle, useIsUserPageEditMode } from "@/pages/UserPage";
import { Box, Button } from "@mui/material";
import defaultUserImage from '@/assets/images/Avatar.png';

function UserImageChangeWrapper({ mode, profileUrl }: { mode: string, profileUrl?: string }) {
    function ProfileImage({ src }: { src: string }) {
        return <img
            src={src}
            alt="프로필 이미지"
            style={{
                width: '200px',
                height: '200px',
                borderRadius: '100%',
            }}
        />
    }
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '-25%',
            }}
        >
            <Box>
                {profileUrl
                    ? <ProfileImage src={profileUrl} />
                    : <ProfileImage src={defaultUserImage} />
                }
                {useIsUserPageEditMode(mode) &&
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: '8px',
                            mt: '24px',
                        }}
                    >
                        <Button sx={grayOutlinedButtonStyle}>이미지 변경</Button>
                        <Button sx={grayFullfilledButtonStyle}>이미지 삭제</Button>
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default UserImageChangeWrapper;
