import { useGetBoardIsPublic } from "@/api/board";
import PublishBoardButton from "@/components/atoms/Board/PublishBoardButton";
import { typographyStyle } from "@/components/atoms/Modal/BoardShareAndPublishModalElement";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { Box, Typography } from "@mui/material";

function BoardPublishModalElement({ value, index }: { value: number, index: number }) {
    const info = {
        isPublished: {
            text: `이 보드는 트렌딩 보드에 게시되었습니다.
            혼자만 보고 싶다면,
            게시 취소 버튼을 누르세요.`,
        },
        isNotPublished: {
            text: `
            이 보드를 트렌딩 보드에 게시하며,
            다른 사람들에게 나만의 보드를 자랑하고
            의견을 나눌 수 있습니다.
            `,
        }
    }

    const { board, setBoard } = useBoardAtom();
    const { isBoardPublic, isLoadingGetIsBoardPublic } = useGetBoardIsPublic(board.boardUUID);
    const getTextByIsBoardPublic = () => {
        return isBoardPublic ? info.isPublished.text : info.isNotPublished.text;
    }

    if (isLoadingGetIsBoardPublic) {
        return (
            <Typography>게시 여부를 확인 중입니다...</Typography>
        )
    }

    if (value !== index) {
        return;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography sx={{
                ...typographyStyle,
                p: '24px 0',
            }}>
                {getTextByIsBoardPublic()}
            </Typography>
            <PublishBoardButton isBoardPublic={isBoardPublic} />
        </Box>
    )
}

export default BoardPublishModalElement;
