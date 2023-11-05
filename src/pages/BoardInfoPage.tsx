import theme from "@/assets/styles/theme";

import { Box, Button, Typography, colors } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { useBoardContentAtom } from "@/hooks/useBoardContentAtom";
import { useGetBoard } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";

import {PasteScrapIcon, PasteStickerIcon, EditModeIcon, ReadModeIcon, BoardInfoSaveIcon, BoardInfoShareIcon, SettingIcon} from "@/components/atoms/Icon";
import { TrashableItems } from "@/components/templates/TrashableItems";

function BoardInfoPage() {
    const params = useParams();

    function getBoardPageId(): string | null {
        return params['boardUUID'] || null;
    }

    const { board, setBoard } = useBoardAtom();
    const boardPageId = getBoardPageId();

    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const isViewerMode = (mode: string) => mode === 'view';

    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        ['board', boardPageId],
        () => boardPageId && useGetBoard(boardPageId.toString()),
        {
            enabled: !!boardPageId,
            onSuccess: (data) => {
                if (data) {
                    setBoard((prev) => ({
                        ...prev,
                        boardUUID: boardPageId,
                        ...data.data,
                    }))
                }
            },
            onError: () => {
                useDefaultSnackbar('존재하지 않거나 권한이 없는 보드입니다.', 'error');
                navigate('/board');
            },
            retry: false,
            useErrorBoundary: (error: Error) => error.message !== "NF005",
        }
    )

	const { openModal } = useModal();
	const { handleSaveBoard } = useBoardContentAtom();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 'calc(100% - 56px)',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '24px',
                        fontWeight: '500',
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        )
    }


	return (
		<Box
			sx={{
				width: '100%',
				height: 'calc(100% - 56px)',
				position: 'fixed',
			}}
		>
			<Box
				sx={{
					position: 'fixed',
                    left: '0',
                    width: {
                        xs: '100%',
                        sm: 'calc(100% - 86px)',
                    },
                    height: '100%',
                    overflow: 'auto',
                    pb: '100px',
                    boxSizing: 'border-box',
                }}
			>
				<Typography
					variant="h1"
					sx={{
						fontSize: '24px',
                        fontWeight: '500',
                        m: '20px',
					}}
				>
					{board.title}
				</Typography>
				<Box
					sx={{
						display: 'flex',
                        justifyContent: 'space-between',
					}}
				>
					{boardPageId &&
                        <TrashableItems
                            confirmDrop={false}
                            mode={mode}
                        />
                    }
				</Box>
			</Box>
			<Box
				sx={{
					display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                    flexDirection: 'column',
                    position: 'fixed',
                    right: '0',
                    width: '86px',
                    height: '100%',
                    gap: '16px',
					backgroundColor: 'rgba(255, 255, 255, 0.40)',

				}}
			>
				<Button
					sx={{
						cursor: "pointer",
						flexDirection: "column",
						textAlign: "center",
						backgroundColor: isViewerMode(mode)? theme.color.Gray_040 : theme.color.Gray_020,
						borderRadius: "20px",
						paddingTop: "10px",
						paddingBottom: "10px",
						border: "1px solid rgba(0, 0, 0, 0.12)",
						mt: "15px",
						mr: "10px",
						ml: "10px",
					}}
					onClick={() =>
						openModal("scrapCreateOnBoard")
					}
					disabled={isViewerMode(mode)}
				>
					<Box
						sx={{
							cursor: "pointer",
						}}
					>
						<PasteScrapIcon
							width="20"
							height="20"
							fill={isViewerMode(mode)? theme.color.Gray_050 : theme.color.Gray_080}
						/>
					</Box>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
                            color: isViewerMode(mode)? theme.color.Gray_050 : theme.color.Gray_080
						}}
					>
						스크랩
					</Typography>
				</Button>

				<Button
					sx={{
						cursor: "pointer",
						flexDirection: "column",
						textAlign: "center",
						backgroundColor: isViewerMode(mode)? theme.color.Gray_040 : theme.color.Gray_020,
						borderRadius: "20px",
						paddingTop: "10px",
						paddingBottom: "10px",
						border: "1px solid rgba(0, 0, 0, 0.12)",
						mr: "10px",
						ml: "10px",
					}}
					onClick={() =>
						openModal("stickerPaste")
					}
					disabled={isViewerMode(mode)}
				>
					<Box
						sx={{
							cursor: "pointer",
						}}
					>
						<PasteStickerIcon
							width="20"
							height="20"
							fill={isViewerMode(mode)? theme.color.Gray_050 : theme.color.Gray_080}
						/>
					</Box>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
                            color: isViewerMode(mode)? theme.color.Gray_050 : theme.color.Gray_080
						}}
					>
						스티커
					</Typography>
				</Button>

				{isViewerMode(mode) ? (
					<Button
						sx={{
							cursor: "pointer",
							flexDirection: "column",
							textAlign: "center",
							backgroundColor: theme.color.Gray_020,
							borderRadius: "20px",
							paddingTop: "10px",
							paddingBottom: "10px",
							border: "1px solid rgba(0, 0, 0, 0.12)",
							mr: "10px",
							ml: "10px",
						}}
						onClick={() => setMode("edit")}
					>
						<Box
							sx={{
								cursor: "pointer",
							}}
						>
							<EditModeIcon
								width="20"
								height="20"
								fill={theme.color.Gray_080}
							/>
						</Box>
						<Typography
							variant="h4"
							sx={{
								overflow: "hidden",
								color: theme.color.Gray_080
							}}
						>
							편집
						</Typography>
					</Button>
				) : (
					<Button
						sx={{
							cursor: "pointer",
							flexDirection: "column",
							textAlign: "center",
							backgroundColor: theme.color.Gray_020,
							borderRadius: "20px",
							paddingTop: "10px",
							paddingBottom: "10px",
							border: "1px solid rgba(0, 0, 0, 0.12)",
							mr: "10px",
							ml: "10px",
						}}
						onClick={() => {
							setMode("view");
							handleSaveBoard();
						}}
					>
						<Box
							sx={{
								cursor: "pointer",
							}}
						>
							<ReadModeIcon
								width="20"
								height="20"
								fill={theme.color.Gray_080}
							/>
						</Box>
						<Typography
							variant="h4"
							sx={{
								overflow: "hidden",
								color: theme.color.Gray_080
							}}
						>
							읽기
						</Typography>
					</Button>
				)}
				<Button
					sx={{
						cursor: "pointer",
						flexDirection: "column",
						textAlign: "center",
						backgroundColor: theme.color.Gray_020,
						borderRadius: "20px",
						paddingTop: "10px",
						paddingBottom: "10px",
						border: "1px solid rgba(0, 0, 0, 0.12)",
						mr: "10px",
						ml: "10px",
					}}
					onClick={() => {
						setMode("view");
						handleSaveBoard();
					}}
				>
					<Box
						sx={{
							cursor: "pointer",
						}}
					>
						<BoardInfoSaveIcon
							width="20"
							height="20"
							fill={theme.color.Gray_080}
						/>
					</Box>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: theme.color.Gray_080
						}}
					>
						저장
					</Typography>
				</Button>

                <Button
					sx={{
						cursor: "pointer",
						flexDirection: "column",
						textAlign: "center",
						backgroundColor: theme.color.Gray_020,
						borderRadius: "20px",
						paddingTop: "10px",
						paddingBottom: "10px",
						border: "1px solid rgba(0, 0, 0, 0.12)",
						mr: "10px",
						ml: "10px",
					}}
                    onClick={() => openModal('boardShare')}
				>
					<Box
						sx={{
							cursor: "pointer",
						}}
					>
						<BoardInfoShareIcon
							width="20"
							height="20"
							fill={
								theme.color.Gray_080
							}
						/>
					</Box>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: theme.color.Gray_080
						}}
					>
						공유
					</Typography>
				</Button>

                <Button
					sx={{
						cursor: "pointer",
						flexDirection: "column",
						textAlign: "center",
						backgroundColor: theme.color.Gray_020,
						borderRadius: "20px",
						paddingTop: "10px",
						paddingBottom: "10px",
						border: "1px solid rgba(0, 0, 0, 0.12)",
						mr: "10px",
						ml: "10px",
					}}
                    onClick={() => openModal('boardEdit')}
				>
					<Box
						sx={{
							cursor: "pointer",
						}}
					>
						<SettingIcon
							width="20"
							height="20"
							fill={theme.color.Gray_080}
						/>
					</Box>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: theme.color.Gray_080
						}}
					>
						설정
					</Typography>
				</Button>
            </Box>
        </Box >
	);
}

export default BoardInfoPage;
