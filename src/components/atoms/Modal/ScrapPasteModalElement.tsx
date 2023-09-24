import SearchBar from "@/components/molcules/SearchBar";
import { Box, Tab, Tabs } from "@mui/material";

function ScrapPasteModalElement() {
    return (
        <Box>
            <SearchBar type={"list"} />
            <Tabs
                variant="fullWidth"
                sx={{
                    '& .MuiButtonBase-root': {
                        minWidth: 'auto',
                    }
                }}
            >
                <Tab label="전체" />
                <Tab label="상품" />
                <Tab label="아티클" />
                <Tab label="비디오" />
                <Tab label="장소" />
            </Tabs>
        </Box>
    );
}

export default ScrapPasteModalElement;
