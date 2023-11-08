import ImageUploadButton from "@/components/atoms/ImageUploadButton";
import { Box } from "@mui/material";

function ButtonWrapper() {
	return (
		<Box
			sx={{
				width: '300px',
			}}
		>
			<ImageUploadButton />
		</Box>
	)
}

export default {
	title: "Atoms/ImageUploadButton",
	component: ButtonWrapper,
};

export const ImageUploadButtonStory = {};
