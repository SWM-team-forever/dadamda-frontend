import styled from 'styled-components';

interface IconButtonProps {
    src: string,
    style?: object,
    onClick?: () => void,
}

function IconButton({ src, style, onClick }: IconButtonProps) {
    return (
        <Icon src={src} style={style} onClick={onClick} />
    )
}

const Icon = styled.img`
    cursor: pointer;
`

export default IconButton
