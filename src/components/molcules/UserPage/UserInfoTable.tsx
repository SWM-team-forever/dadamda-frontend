import theme from "@/assets/styles/theme";
import { useConvertUnixTimeToDateFormat, useGetDaysDiff } from "@/hooks/useCalculateDateDiff";
import { TableContainer, Box, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";

interface UserInfoTableProps {
    name: string;
    nickname: string;
    createdAt: number;
    provider: string;
}

function UserInfoTable({ userInformation }: { userInformation: UserInfoTableProps }) {
    const { name, nickname, createdAt, provider } = userInformation;
    const createdDateInDateFormat = useConvertUnixTimeToDateFormat(createdAt);
    const daysDiffFromCreatedDate = useGetDaysDiff(createdAt);
    const daysDiffInfoString = `(+ 가입한 지 ${daysDiffFromCreatedDate}일이 지났습니다.)`;
    const providerInfoString = `${provider} 계정으로 가입되셨습니다.`;

    const userPageMenus = [
        userPageMenuNameAndContent('이름', name),
        userPageMenuNameAndContent('닉네임', nickname),
        userPageMenuNameAndContent('가입날짜', [createdDateInDateFormat, daysDiffInfoString]),
        userPageMenuNameAndContent('연결된 소셜 계정', providerInfoString),
    ];

    const userPageMenuTypographyStyle = {
        color: theme.color.Gray_090,
        fontSize: '16px',
        lineHeight: '150%',
    };

    const countDiffFromCreatedDateTypographyStyle = {
        color: theme.color.Gray_080,
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '150%',
    };

    function userPageMenuNameAndContent(
        name: string,
        content: string | number | string[]
    ) {
        return { name, content };
    }

    function CreatedDateInfo() {
        return <Box
            sx={{
                display: 'flex',
                alignItems: {
                    xs: 'flex-start',
                    sm: 'center',
                },
                flexDirection: {
                    xs: 'column',
                    sm: 'row',
                },
                gap: {
                    xs: '0',
                    sm: '4px',
                }
            }}
        >
            <Typography
                sx={{
                    ...userPageMenuTypographyStyle,
                    fontWeight: '400',
                }}
            >
                {createdDateInDateFormat}
            </Typography>
            <Typography
                sx={countDiffFromCreatedDateTypographyStyle}
            >
                {daysDiffInfoString}
            </Typography>
        </Box>
    }

    return (
        <TableContainer component={Box}
            sx={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
            }}
        >
            <Table>
                <TableBody>
                    {userPageMenus.map((menu) => (
                        <TableRow>
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                    ...userPageMenuTypographyStyle,
                                    fontWeight: '600',
                                    border: 'none',
                                    p: '7px 20px 7px 0',
                                    width: 'max-content',
                                }}
                            >
                                {menu.name}
                            </TableCell>
                            <TableCell
                                sx={{
                                    ...userPageMenuTypographyStyle,
                                    fontWeight: '400',
                                    border: 'none',
                                    p: '7px 0px',
                                }}
                            >
                                {typeof (menu.content) === 'string'
                                    ? menu.content
                                    : <CreatedDateInfo />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserInfoTable;
