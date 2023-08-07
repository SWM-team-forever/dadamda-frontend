import styled from 'styled-components';

import searchIcon from '../../assets/icons/SearchIcon.png';
import theme from '../../assets/styles/theme';
import useWarningSnackbar from '../../hooks/useWarningSnackbar';

interface ScrapListHeaderProps {
    count: number,
    type: string,
}

function ScrapListHeader({ count, type }: ScrapListHeaderProps) {
    return (
        <ScrapListHeaderWrapper>
            <ScarpCountWrapper>
                <EmpasizedTypography>{count} </EmpasizedTypography>
                <DefaultTypography>개의 </DefaultTypography>
                <EmpasizedTypography>{type} 스크랩</EmpasizedTypography>
                <DefaultTypography>이 있습니다.</DefaultTypography>
            </ScarpCountWrapper>
            <SearchBar onClick={useWarningSnackbar}>
                <SearchIconWrapper src={searchIcon} />
                <EmpasizedTypography>Search</EmpasizedTypography>
            </SearchBar>
        </ScrapListHeaderWrapper>
    )
}

const ScrapListHeaderWrapper = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
`

const ScarpCountWrapper = styled.div`

`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const EmpasizedTypography = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const SearchIconWrapper = styled.img`
    width: 24px;
    height: 24px;
`

export default ScrapListHeader
