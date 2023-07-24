import styled from "styled-components";

interface ProfileImageProps {
  size: number,
  source: string,
}

function ProfileImage({ source, size }: ProfileImageProps) {
  return (
    <ImageContainer>
      <Image src={source} size={size} />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img<{ size: number }>`
  ${props => `width: ${props.size}px`};
  ${props => `height: ${props.size}px`};
  border-radius: 100%;
`

export default ProfileImage;

