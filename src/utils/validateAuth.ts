export const validateUsername = (username: string, isVietnamese: boolean) => {
    if (!username.trim())
        return isVietnamese
            ? 'Vui lòng nhập tên người dùng'
            : 'Please enter your username';

    if (username.length < 3)
        return isVietnamese
            ? 'Vui lòng nhập tên người dùng ít nhất 3 ký tự'
            : 'Username must be at lease 3 characters';

    return '';
};

export const validateEmail = (email: string, isVietnamese: boolean) => {
    if (!email.trim())
        return isVietnamese ? 'Vui lòng nhập email' : 'Please enter your email';

    if (email.length < 8)
        return isVietnamese
            ? 'Vui lòng nhập email ít nhất 8 ký tự'
            : 'Email must be at lease 8 characters';

    if (
        !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    )
        return isVietnamese
            ? 'Vui lòng nhập email hợp lệ'
            : 'Please enter a valid email';

    return '';
};

export const validatePassword = (password: string, isVietnamese: boolean) => {
    if (!password.trim())
        return isVietnamese
            ? 'Vui lòng nhập mật khẩu'
            : 'Please enter your password';

    if (password.length < 8)
        return isVietnamese
            ? 'Vui lòng nhập mật khẩu ít nhất 8 ký tự'
            : 'Password must be at lease 8 characters';

    return '';
};
