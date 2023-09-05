import ProfileImage from "../ProfileImage";
import avatar from '../../../assets/images/Avatar.png';

export function AuthorImageElement({ authorImage }: any) {
    return (
        <>
            {authorImage ? <ProfileImage size={30} source={authorImage} /> : <ProfileImage size={30} source={avatar} />}
        </>
    );
}
