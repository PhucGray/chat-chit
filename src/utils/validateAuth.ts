export const validateEmail = (email: string) => {
    if (!email.trim()) return 'Vui lòng nhập email';

    if (email.length < 8) return 'Vui lòng nhập email ít nhất 8 ký tự';

    if (
        !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    )
        return 'Vui lòng nhập email hợp lệ';

    return '';
};

export const validatePassword = (password: string) => {
    if (password.length < 8) return 'Vui lòng nhập mật khẩu ít nhất 8 ký tự';

    return '';
};
