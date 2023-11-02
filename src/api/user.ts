import { useGetToken, useLogout } from "@/hooks/useAccount";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import {
	DELETE_USER_URL,
	GET_USER_INFORMATION_URL,
	UPLOAD_USER_PROFILE_IMAGE_URL,
} from "@/secret";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

const fetchDeleteUser = async () => {
	const token = useGetToken();

	const response = await fetch(DELETE_USER_URL, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then(async (response) => {
		const body = await response.json();
		if (response.ok) {
			return body;
		} else {
			throw new Error(body.resultCode);
		}
	});

	return response;
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	const logout = useLogout();
	return useMutation(fetchDeleteUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			logout();
			useDefaultSnackbar(
				"회원 탈퇴에 성공했습니다",
				"success"
			);
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar("회원 탈퇴에 실패했습니다", "error");
		},
		useErrorBoundary: true,
	});
};

const getUserInformation = async () => {
	const token = useGetToken();

	const response = await fetch(GET_USER_INFORMATION_URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetUserInformation = () => {
	const { data, isLoading } = useQuery(
		["userInformation"],
		() => getUserInformation(),
		{
			retry: false,
			select: (data) => {
				return data.data;
			},
			onError: (error) => {
				Sentry.captureException(error);
			},
			useErrorBoundary: true,
		}
	);

	const [userInformation, isGetUserInformationLoading] = [
		data,
		isLoading,
	];
	return { userInformation, isGetUserInformationLoading };
};

const changeFileToMultiPartFormData = (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	return formData;
};

const uploadUserProfileImage = (file: File) => {
	const token = useGetToken();

	const fileFormData = changeFileToMultiPartFormData(file);

	const response = fetch(UPLOAD_USER_PROFILE_IMAGE_URL, {
		method: "POST",
		headers: {
			"X-AUTH-TOKEN": token,
		},
		body: fileFormData,
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useUploadUserProfileImage = () => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation(uploadUserProfileImage, {
		onSuccess: () => {
			queryClient.invalidateQueries(["userInformation"]);
			useDefaultSnackbar(
				"프로필 이미지가 변경되었습니다.",
				"success"
			);
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"프로필 이미지 변경에 실패했습니다",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});

	const uploadUserProfileImageMutate = mutate;
	return { uploadUserProfileImageMutate };
};
