import styled from "styled-components";

interface ProfileImageProps {
  size: number,
  source: string,
  onClick?: () => void,
}

function ProfileImage({ source, size, onClick }: ProfileImageProps) {
  return (
    <ImageContainer onClick={onClick}>
      <Image
        src={source || '/default_image.png'}
        size={size}
        onError={e => {
          e.currentTarget.src = '/default_image.png';
        }}
      />
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
  cursor: ${props => props.onClick && 'pointer'};
`

export default ProfileImage;

