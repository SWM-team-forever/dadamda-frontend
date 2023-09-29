import { Global, css } from '@storybook/theming';

export const fontUrl =
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css';

const GlobalStyles = css`
    * {
        fontFamily: Pretendard,'Noto Sans KR', sans-serif;
    }
    :focus:not(:focus-visible) {
        outline: none;
    }
`;
export const GlobalStyle = () => <Global styles={GlobalStyles} />;
