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

import { PasteScrapIcon, PasteStickerIcon, EditModeIcon, ReadModeIcon, BoardInfoSaveIcon, BoardInfoShareIcon, SettingIcon } from "@/components/atoms/Icon";
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
						type: 'mine',
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

	function ButtonWrapper({ isCareViewerMode, isViewerMode, handleButtonClick, children }: { isCareViewerMode: boolean, isViewerMode: boolean, handleButtonClick: () => void, children: React.ReactNode }) {
		return (
			<Button
				sx={{
					flexDirection: "column",
					textAlign: "center",
					backgroundColor: {
						xs: 'none',
						sm: isCareViewerMode ? (isViewerMode ? theme.color.Gray_040 : theme.color.Gray_020) : theme.color.Gray_020,
					},
					borderRadius: "20px",
					p: {
						xs: '0',
						sm: '10px 11px',
					},
					border: {
						xs: 'none',
						sm: "1px solid rgba(0, 0, 0, 0.12)",
					},
					minWidth: '0',
					gap: '5px',
					width: '100%',
				}}
				onClick={handleButtonClick}
				disabled={isCareViewerMode ? isViewerMode : false}
			>
				{children}
			</Button>
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
					display: 'flex',
					flexDirection: {
						xs: 'row',
						sm: 'column',
					},
					position: 'fixed',
					right: '0',
					bottom: '0',
					width: {
						xs: '100%',
						sm: '86px',
					},
					height: {
						xs: '56px',
						sm: 'calc(100% - 56px)',
					},
					gap: '16px',
					backgroundColor: {
						xs: theme.color.Gray_030,
						sm: 'rgba(255, 255, 255, 0.40)',
					},
					p: {
						xs: '0',
						sm: '16px 15px',
					},
					boxSizing: 'border-box',
				}}
			>
				<ButtonWrapper
					isCareViewerMode={true}
					isViewerMode={isViewerMode(mode)}
					handleButtonClick={() => openModal("scrapCreateOnBoard")}
				>
					<PasteScrapIcon
						width="16"
						height="16"
						fill={isViewerMode(mode) ? theme.color.Gray_050 : theme.color.Gray_080}
					/>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: isViewerMode(mode) ? theme.color.Gray_050 : theme.color.Gray_080,
							fontSize: '12px',
						}}
					>
						스크랩
					</Typography>
				</ButtonWrapper>
				<ButtonWrapper
					handleButtonClick={() =>
						openModal("stickerPaste")
					}
					isCareViewerMode={true}
					isViewerMode={isViewerMode(mode)}
				>
					<PasteStickerIcon
						width="16"
						height="16"
						fill={isViewerMode(mode) ? theme.color.Gray_050 : theme.color.Gray_080}
					/>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: isViewerMode(mode) ? theme.color.Gray_050 : theme.color.Gray_080,
							fontSize: '12px',
						}}
					>
						스티커
					</Typography>
				</ButtonWrapper>

				{isViewerMode(mode) ? (
					<ButtonWrapper
						handleButtonClick={() => setMode("edit")}
						isCareViewerMode={false}
						isViewerMode={isViewerMode(mode)}
					>
						<EditModeIcon
							width="16"
							height="16"
							fill={theme.color.Gray_080}
						/>
						<Typography
							variant="h4"
							sx={{
								overflow: "hidden",
								color: theme.color.Gray_080,
								fontSize: '12px',
							}}
						>
							편집
						</Typography>
					</ButtonWrapper>
				) : (
					<ButtonWrapper
						handleButtonClick={() => {
							setMode("view");
							handleSaveBoard();
						}}
						isCareViewerMode={false}
						isViewerMode={isViewerMode(mode)}
					>
						<ReadModeIcon
							width="16"
							height="16"
							fill={theme.color.Gray_080}
						/>
						<Typography
							variant="h4"
							sx={{
								overflow: "hidden",
								color: theme.color.Gray_080,
								fontSize: '12px',
							}}
						>
							읽기
						</Typography>
					</ButtonWrapper>
				)}
				<ButtonWrapper
					handleButtonClick={() => {
						setMode("view");
						handleSaveBoard();
					}}
					isCareViewerMode={false}
					isViewerMode={isViewerMode(mode)}
				>
					<BoardInfoSaveIcon
						width="16"
						height="16"
						fill={theme.color.Gray_080}
					/>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: theme.color.Gray_080,
							fontSize: '12px',
						}}
					>
						저장
					</Typography>
				</ButtonWrapper>
				<ButtonWrapper
					handleButtonClick={() => openModal('boardShare')}
					isCareViewerMode={false}
					isViewerMode={isViewerMode(mode)}
				>
					<BoardInfoShareIcon
						width="16"
						height="16"
						fill={
							theme.color.Gray_080
						}
					/>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: theme.color.Gray_080,
							fontSize: '12px',
						}}
					>
						공유
					</Typography>
				</ButtonWrapper>
				<ButtonWrapper
					handleButtonClick={() => openModal('boardEdit')}
					isCareViewerMode={false}
					isViewerMode={isViewerMode(mode)}
				>
					<SettingIcon
						width="16"
						height="16"
						fill={theme.color.Gray_080}
					/>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							color: theme.color.Gray_080,
							fontSize: '12px',
						}}
					>
						설정
					</Typography>
				</ButtonWrapper>
			</Box>
		</Box >
	);
}

export default BoardInfoPage;
