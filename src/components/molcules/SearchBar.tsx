import { Box, Button, InputBase } from "@mui/material";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import theme from "@/assets/styles/theme";
import { useIsBlank } from "@/hooks/useValidation";
import { logEvent } from "@/utility/amplitude";

import { SearchIcon } from "@/components/atoms/Icon";

function SearchBar({ type }: { type: string }) {
    const [searchText, setSearchText] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    function isSearchTemplate() {
        return searchParams.has('keyword');
    }

    function getKeyword() {
        return searchParams.get('keyword');
    }

    const buttonInfo = {
        isSearched: {
            text: '지우기',
            action: () => {
                logEvent(`erase_search`);
                setSearchText('');
                searchParams.delete('keyword');
                setSearchParams(searchParams);
            }
        },
        isNotSearched: {
            text: '검색',
            action: () => {
                logEvent(`search_${type}`, { keyword: searchText });
                searchParams.append('keyword', searchText);
                setSearchParams(searchParams);
            }
        }
    };

    const isValidationSuccess = () => useIsBlank(searchText) ? false : true;

    return (
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
                value={isSearchTemplate() ? getKeyword() : searchText}
                placeholder="검색"
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
                        disabled={!isValidationSuccess() && !isSearchTemplate()}
                        onClick={isSearchTemplate() ? buttonInfo.isSearched.action : buttonInfo.isNotSearched.action}
                    >
                        {isSearchTemplate() ? buttonInfo.isSearched.text : buttonInfo.isNotSearched.text}
                    </Button>
                }
            />
        </Box>
    )
}

export default SearchBar;
