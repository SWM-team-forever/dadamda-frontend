import { Box, InputBase } from "@mui/material";

import theme from "@/assets/styles/theme";

import { SearchIcon } from "@/components/atoms/Icon";

function SearchBar() {
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
            <Box
                sx={{
                    display: 'flex',
                    gap: '4px',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <SearchIcon width="16" height="16" fill={theme.color.Gray_070} />
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        '& .MuiInputBase-input': {
                            color: theme.color.Gray_070,
                            fontWeight: '500',
                            lineHeight: '150%',
                            fontSize: '14px',
                        }
                    }}
                    placeholder="검색"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Box>
        </Box>
    )
}

export default SearchBar;
