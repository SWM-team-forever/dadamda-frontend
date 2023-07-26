import styled from 'styled-components';
import { TextareaAutosize } from '@mui/material';

import theme from '../../assets/styles/theme';

interface TextAreaProps {
    labelText: string,
    defaultValue: string,
}

function TextArea({ labelText, defaultValue }: TextAreaProps) {
    return (
        <TextAreaWrapper>
            <Label>{labelText}</Label>
            <InputAreaWrapper>
                <TextareaAutosize
                    defaultValue={defaultValue}
                    style={{
                        resize: 'none',
                        background: theme.color.background_color,
                        border: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                        borderRadius: '4px',
                        padding: '10px',
                    }}
                />
                <div style={{ position: 'absolute', top: '-12px', right: '-12px' }}>
                    <DeleteIcon />
                </div>
            </InputAreaWrapper>
        </TextAreaWrapper >
    );
}

const TextAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    gap: 5px;
    width: 100%;
`

const Label = styled.label`
    font-size: 12px;
    font-weight: 700;
    color: ${theme.color.text_gray_color};
`

const InputAreaWrapper = styled.div`
    position: relative;
`

function DeleteIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={theme.color.text_gray_color}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.5918 10.0154L7.117 11.499C7.02179 11.5915 6.94595 11.7021 6.89392 11.8242C6.84188 11.9464 6.81469 12.0776 6.81393 12.2104C6.81317 12.3432 6.83885 12.4747 6.88948 12.5975C6.9401 12.7202 7.01466 12.8316 7.10881 12.9252C7.20295 13.0189 7.31479 13.0928 7.43781 13.1427C7.56083 13.1927 7.69256 13.2176 7.82531 13.2161C7.95807 13.2146 8.0892 13.1866 8.21104 13.1339C8.33289 13.0812 8.44302 13.0047 8.535 12.909L10.0027 11.4325L11.442 12.878C11.6291 13.0661 11.8833 13.1721 12.1485 13.1727C12.4138 13.1734 12.6685 13.0686 12.8565 12.8815C13.0445 12.6944 13.1505 12.4403 13.1512 12.175C13.1519 11.9097 13.0471 11.6551 12.86 11.467L11.4127 10.0141L12.895 8.52298C13.0767 8.33388 13.1768 8.08097 13.1738 7.81874C13.1709 7.55651 13.065 7.30595 12.879 7.12104C12.6931 6.93612 12.4419 6.83166 12.1797 6.83016C11.9174 6.82865 11.6651 6.93022 11.477 7.11298L10.0015 8.59732L8.5 7.09002C8.3118 6.90742 8.05939 6.80606 7.79717 6.80776C7.53495 6.80947 7.28389 6.9141 7.09807 7.09913C6.91225 7.28416 6.80655 7.53478 6.80373 7.79699C6.80091 8.05921 6.90121 8.31204 7.083 8.50102L8.5918 10.0154Z" fill="#44546F" />
        </svg>
    );
}

export default TextArea;
