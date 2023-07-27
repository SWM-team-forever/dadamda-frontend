import styled from 'styled-components';
import theme from '../../assets/styles/theme';

interface MemoProps {
    imageSource?: string,
    textContent?: string,
}

function Memo({ imageSource, textContent }: MemoProps) {
    return (
        <MemoContainer>
            {textContent}
            {imageSource && <ImageMemo src={imageSource} />}
        </MemoContainer>
    );
}

const MemoContainer = styled.div`
    width: 100%;
    border-radius: 4px;
    background-color: ${theme.color.background_color};
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const ImageMemo = styled.img<{ imageSource?: string }>`
    width: 100%;
    border-radius: 4px;
`

export default Memo;
