import styled from 'styled-components';

import theme from '../../assets/styles/theme';

function EmptyScrapContainer() {
    return (
        <ScrapList>
            <EmpasizedTypography>스크랩을 추가해주세요</EmpasizedTypography>
        </ScrapList>
    );
}

const EmpasizedTypography = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
`

const ScrapList = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
`

export default EmptyScrapContainer;
