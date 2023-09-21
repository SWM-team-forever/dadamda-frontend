import theme from "@/assets/styles/theme";
import { DownIcon, MoveBackIcon, MoveToPageIcon, UpIcon } from "@/components/atoms/Icon";
import MemoCreateModalElement from "@/components/atoms/Modal/MemoCreateModalElement";
import Memo from "@/components/molcules/Memo";
import { useSelectedScrap } from "@/hooks/useSelectedScrap";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function MoveToPageMobileModal() {
    const { selectedScrap, removeSelectedScrap } = useSelectedScrap();
    const [isMemoListOpen, setIsMemoListOpen] = useState(false);
    function toggleMemoList() {
        setIsMemoListOpen(!isMemoListOpen);
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const scrapId = searchParams.get('scrapId');

    function isSelectedScrap() {
        return scrapId && selectedScrap.scrapId === +(scrapId);
    }

    return (
        <>
            {isSelectedScrap() &&
                <Box
                    sx={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        backgroundColor: theme.color.Gray_020,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            p: '16px',
                            backgroundColor: theme.color.Gray_030,
                            display: 'flex',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            onClick={removeSelectedScrap}
                        >
                            <MoveBackIcon
                                width="24"
                                height="24"
                                fill={theme.color.Gray_090}
                            />
                        </Box>
                        <Box
                            onClick={() => window.open(selectedScrap.pageUrl)}
                        >
                            <MoveToPageIcon
                                width="24"
                                height="24"
                                fill={theme.color.Gray_090}
                            />
                        </Box>
                    </Box>
                    <iframe
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        src={selectedScrap.pageUrl}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '0',
                            top: isMemoListOpen ? 0 : 'calc(100% - 56px)',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            zIndex: 999,
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                p: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                boxSizing: 'border-box',
                                backgroundColor: theme.color.Gray_030,
                                alignItems: 'center',
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
                                    {selectedScrap.memoList.length}
                                </Typography>
                            </Box>
                            <Box
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMemoList();
                                }}
                            >
                                {
                                    isMemoListOpen
                                        ? <DownIcon width="24" height="24" fill={theme.color.Gray_090} />
                                        : <UpIcon width="24" height="24" fill={theme.color.Gray_090} />
                                }
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                background: ' linear-gradient(163deg, #ECEFF4 0%, #DAE0EB 101.19%)',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                justifyContent: 'flex-end',
                                p: '16px',
                                boxSizing: 'border-box',
                            }}
                        >
                            {selectedScrap.memoList.map((memo) => {
                                return <Memo
                                    memoImageURL={memo.memoImageUrl}
                                    memoText={memo.memoText}
                                    createdDate={memo.createdDate}
                                />
                            })}
                            <Box
                                sx={{
                                    borderRadius: '0px 8px 8px 8px',
                                    backgroundColor: theme.color.Gray_020,
                                    p: '16px 0',
                                }}
                            >
                                <MemoCreateModalElement />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    )
}

export default MoveToPageMobileModal;
