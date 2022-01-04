import { Icon } from '@iconify/react';
import { confirmPasswordReset } from 'firebase/auth';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import GroupControl from '../components/GroupControl';
import { setModal } from '../features/modal/modalSlice';
import { selectLanguage } from '../features/setting/settingSlice';
import { auth } from '../firebase';
import { SubmitFormType } from '../types';
import { validatePassword } from '../utils/validateAuth';

const CreateNewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    // const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [spin, setSpin] = useState(false);

    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const confirmPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    const validateFields = async () => {
        let isValid = true;

        const validatePasswordMsg = validatePassword(password, isVietnames);
        const validateConfirmMsg = validatePassword(
            confirmPassword,
            isVietnames,
        );

        if (validateConfirmMsg) {
            isValid = false;
            setConfirmError(validateConfirmMsg);
            confirmPasswordRef.current.focus();
        }

        if (validatePasswordMsg) {
            isValid = false;
            setPasswordError(validatePasswordMsg);
            passwordRef.current.focus();
        }

        if (password !== confirmPassword) {
            isValid = false;

            setConfirmError(
                isVietnames ? 'Mật khẩu không trùng' : 'Password not match',
            );

            confirmPasswordRef.current.focus();
        }

        return isValid;
    };

    const handleCreateNewPassword = async (e: SubmitFormType) => {
        e.preventDefault();

        const isValid = await validateFields();

        if (isValid) {
            const oobCode = new URLSearchParams(location.search).get('oobCode');
            if (oobCode) {
                try {
                    setSpin(true);

                    await confirmPasswordReset(auth, oobCode, password);

                    dispatch(
                        setModal({
                            isModalOpen: true,
                            message:
                                'Đổi mật khẩu thành công, vui lòng đăng nhập lại.',
                        }),
                    );
                    navigate('/sign-in');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    useEffect(() => {
        if (passwordError || confirmError) validateFields();
    }, [isVietnames]);

    return (
        <>
            {localStorage.getItem('resetPassword') ? (
                <div className='mt-[20px] lg:mt-[40px] w-max mx-auto text-center'>
                    <p className='text-[35px] font-semibold'>
                        {isVietnames ? 'Đặt lại mật khẩu' : 'Reset password'}
                    </p>

                    <form
                        onSubmit={handleCreateNewPassword}
                        className='flex flex-col mt-[30px] space-y-[15px]'>
                        <GroupControl
                            key='Password'
                            label=''
                            error={passwordError}>
                            <input
                                className={`input-text py-[10px] ${
                                    passwordError && 'error'
                                }`}
                                ref={passwordRef}
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder={
                                    isVietnames
                                        ? 'Nhập mật khẩu mới'
                                        : 'Enter your new password'
                                }
                                autoFocus
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError('');
                                }}
                                onClick={() => setPasswordError('')}
                            />

                            <Icon
                                icon={
                                    isPasswordVisible
                                        ? 'gridicons:visible'
                                        : 'gridicons:not-visible'
                                }
                                fontSize={23}
                                className='absolute right-[10px] top-[25%] cursor-pointer'
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            />
                        </GroupControl>

                        <GroupControl
                            key='Confirm password'
                            label=''
                            error={confirmError}>
                            <input
                                ref={confirmPasswordRef}
                                className={`input-text py-[10px] ${
                                    passwordError && 'error'
                                }`}
                                type={isConfirmVisible ? 'text' : 'password'}
                                placeholder={
                                    isVietnames
                                        ? 'Xác nhận mật khẩu'
                                        : 'Confirm password'
                                }
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmError('');
                                }}
                                onClick={() => setConfirmError('')}
                            />

                            <Icon
                                icon={
                                    isConfirmVisible
                                        ? 'gridicons:visible'
                                        : 'gridicons:not-visible'
                                }
                                fontSize={23}
                                className='absolute right-[10px] top-[25%] cursor-pointer'
                                onClick={() =>
                                    setIsConfirmVisible(!isConfirmVisible)
                                }
                            />
                        </GroupControl>

                        <button
                            disabled={spin}
                            className='btn py-[10px] flex items-center justify-center gap-2'>
                            {spin && (
                                <Icon
                                    className='animate-spin'
                                    icon='icon-park:loading-four'
                                    fontSize={30}
                                />
                            )}
                            <span className='font-semibold'>
                                {isVietnames ? 'Đặt lại' : 'Reset'}
                            </span>
                        </button>
                    </form>
                </div>
            ) : (
                <Navigate to='/sign-in' replace />
            )}
        </>
    );
};

export default CreateNewPassword;
