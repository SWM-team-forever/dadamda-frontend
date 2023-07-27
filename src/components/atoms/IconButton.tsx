import styled from 'styled-components';

interface IconButtonProps {
    src: string,
    style: object,
}

function IconButton({ src, style }: IconButtonProps) {
    return (
        <Icon src={src} style={style} />
    )
}

const Icon = styled.img`
    cursor: pointer;
`

export default IconButton
