import theme from "@/assets/styles/theme";
import MemoCreateInput from "@/components/molcules/CategoryItem/Memo/MemoCreateInput";
import Memo from "@/components/molcules/Memo";
import { contentProps } from "@/types/ContentType";
import { Box, Typography } from "@mui/material";

function MemoList({ memoList, scrapId }: { memoList: contentProps['content']['memoList'], scrapId: number }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '2px',
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={600}
                    lineHeight={'150%'}
                    color={theme.color.Gray_080}
                >
                    나의 메모
                </Typography>
                <Typography
                    variant="h6"
                    fontWeight={400}
                    lineHeight={'150%'}
                    color={theme.color.Gray_080}
                >
                    {memoList.length}
                </Typography>
            </Box>
            <Box
                sx={{
                    borderRadius: '0px 8px 8px 8px',
                    backgroundColor: theme.color.Gray_020,
                    p: '16px 0',
                }}
            >
                <MemoCreateInput scrapId={scrapId} />
            </Box>
            {memoList.map((memo) => {
                return <Memo
                    memoImageURL={memo.memoImageUrl}
                    memoText={memo.memoText}
                    createdDate={memo.createdDate}
                    scrapId={scrapId}
                    memoId={memo.memoId}
                />
            })}
        </Box>
    )
}

export default MemoList;
