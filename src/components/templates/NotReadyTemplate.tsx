import styled from 'styled-components';
import theme from '../../assets/styles/theme';

function NotReadyTemplate() {
    return (
        <TemplateWrapper>
            <EmpasizedTypography>아직 지원하지 않는 기능입니다</EmpasizedTypography>
        </TemplateWrapper>
    )
}

const TemplateWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${theme.color.background_color};
    display: flex;
    justify-content: center;
    align-items: center;
`

const EmpasizedTypography = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: ${theme.color.icon_color};
    padding: 10px;
    box-sizing: border-box;
`

export default NotReadyTemplate
