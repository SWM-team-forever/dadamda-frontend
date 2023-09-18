import { Box, Button, InputBase } from "@mui/material";

import theme from "@/assets/styles/theme";

import { SearchIcon } from "@/components/atoms/Icon";
import { useRef, useState } from "react";
import { useGetScrapSearchResultByType } from "@/api/search";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
    const [isSearched, setIsSearched] = useState(false);
    const [searchText, setSearchText] = useState('');

    function getType() {
        const path = location.pathname.split('/');
        return path[2];
    }
    const navigate = useNavigate();

    const buttonInfo = {
        isSearched: {
            text: '지우기',
            action: () => {
                setIsSearched(false);
                setSearchText('');
                navigate(`/scrap/${getType()}`);
            }
        },
        isNotSearched: {
            text: '검색',
            action: () => {
                navigate(`/scrap/${getType()}?keyword=${searchText}`)
                setIsSearched(true);
            }
        }
    };

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
                value={searchText}
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
                        onClick={isSearched ? buttonInfo.isSearched.action : buttonInfo.isNotSearched.action}
                    >
                        {isSearched ? buttonInfo.isSearched.text : buttonInfo.isNotSearched.text}
                    </Button>
                }
            />
        </Box>
    )
}

export default SearchBar;
