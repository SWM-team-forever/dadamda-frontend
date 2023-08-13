import styled from 'styled-components';
import theme from '../../assets/styles/theme';

interface MemoProps {
    memoImageURL?: string,
    memoText?: string,
}

function Memo({ memoImageURL, memoText }: MemoProps) {
    return (
        <MemoContainer>
            {memoText ? memoText : <ImageMemo src={memoImageURL} />}
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
    white-space: pre-wrap;
    word-break: break-all;
`

const ImageMemo = styled.img<{ imageSource?: string }>`
    width: 100%;
    border-radius: 4px;
`

export default Memo;
