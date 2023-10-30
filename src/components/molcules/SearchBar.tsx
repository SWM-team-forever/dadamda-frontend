import { Box, Button, InputBase } from "@mui/material";
import { useState } from "react";

import theme from "@/assets/styles/theme";
import { useIsBlank } from "@/hooks/useValidation";
import { logEvent } from "@/utility/amplitude";

import { MoveBackIcon, SearchIcon } from "@/components/atoms/Icon";
import { useSearch } from "@/hooks/useSearch";

function SearchBar({ type }: { type: string }) {
    const { search, searchKeyword, undoSearch } = useSearch();
    const [searchText, setSearchText] = useState(search.keyword || '');

    function handleSearchButton() {
        logEvent(`search_${type}`, { keyword: searchText });
        searchKeyword({ keyword: searchText, type: type });
    }

    function handleUndoSearchButton() {
        logEvent(`erase_search`);
        undoSearch();
        setSearchText('');
    }

    const isValidationSuccess = () => {
        return useIsBlank(searchText) ? false : true;
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            isValidationSuccess() && handleSearchButton();
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            {
                search.isSearched && <Box
                    onClick={handleUndoSearchButton}
                    sx={{
                        cursor: 'pointer',
                    }}
                >
                    <MoveBackIcon width="16" height="12" fill={theme.color.Gray_070} />
                </Box>
            }
            <Box
                sx={{
                    width: '100%',
                    borderRadius: '6px',
                    background: theme.color.Gray_020,
                    p: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <InputBase
                    sx={{
                        flex: 1,
                        gap: '8px',
                        alignItems: 'center',
                        '& .MuiInputBase-input': {
                            color: theme.color.Gray_070,
                            fontWeight: '500',
                            lineHeight: '150%',
                            fontSize: '14px',
                            p: '0',
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    value={searchText}
                    placeholder="검색어를 입력하세요."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    startAdornment={
                        <SearchIcon width="16" height="16" fill={theme.color.Gray_070} />
                    }
                    onChange={(e) => { setSearchText(e.target.value) }}
                    endAdornment={
                        <Button
                            sx={{
                                p: '0',
                                color: theme.color.Gray_070,
                            }}
                            disabled={!isValidationSuccess()}
                            onClick={handleSearchButton}
                        >
                            검색
                        </Button>
                    }
                />
            </Box>
        </Box>
    )
}

export default SearchBar;
