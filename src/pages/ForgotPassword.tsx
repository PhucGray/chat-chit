import { sendPasswordResetEmail } from 'firebase/auth';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import GroupControl from '../components/GroupControl';
import { setModal } from '../features/modal/modalSlice';
import { selectLanguage } from '../features/setting/settingSlice';
import { auth } from '../firebase';
import { SubmitFormType } from '../types';
import { validateEmail } from '../utils/validateAuth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [spin, setSpin] = useState(false);

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    const validateFields = async () => {
        const validateEmailMsg = validateEmail(email, isVietnames);
        setError(validateEmailMsg);

        if (validateEmailMsg) return false;

        return true;
    };

    const handleResetPassword = async (e: SubmitFormType) => {
        e.preventDefault();

        const isValid = await validateFields();

        if (isValid) {
            try {
                setSpin(true);

                await sendPasswordResetEmail(auth, email, {
                    url: 'http://localhost:3000/forgot-password',
                });

                localStorage.setItem('resetPassword', 'true');

                dispatch(
                    setModal({
                        isModalOpen: true,
                        message: 'Vui lòng kiểm tra email.',
                    }),
                );

                navigate('/sign-in');
            } catch (error) {
                console.log(error);
                setError('Email không chính xác');
            }
        }
    };

    useEffect(() => {
        if (error) validateFields();
    }, [isVietnames]);

    return (
        <div className='mt-[20px] lg:mt-[40px] w-max mx-auto text-center'>
            <p className='text-[35px] font-semibold'>
                {isVietnames ? 'Đặt lại mật khẩu' : 'Reset password'}
            </p>

            <form
                onSubmit={handleResetPassword}
                className='flex flex-col mt-[30px] space-y-[15px]'>
                <GroupControl key='Email' label='' error={error}>
                    <input
                        ref={emailRef}
                        className={`input-text py-[10px] ${error && 'error'}`}
                        type='text'
                        placeholder={
                            isVietnames ? 'Nhập email' : 'Enter your email'
                        }
                        autoFocus
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        onClick={() => setError('')}
                    />
                </GroupControl>

                <button
                    disabled={spin}
                    className='btn py-[10px] flex items-center justify-center gap-2'>
                    {spin && (
                        <AiOutlineLoading3Quarters
                            className='animate-spin'
                            fontSize={30}
                        />
                    )}
                    <span className='font-semibold'>
                        {isVietnames ? 'Gửi' : 'Send'}
                    </span>
                </button>
            </form>

            <p className='mt-5 mb-2 italic text-gray-500 text-center'>
                --- {isVietnames ? 'hoặc' : 'or'} ---
            </p>

            <div className='flex items-center justify-center gap-2'>
                <p className='italic text-gray-500 text-center'>
                    {isVietnames
                        ? 'Đã có tài khoản ?'
                        : 'Already have an account ?'}
                </p>

                <Link to='/sign-in'>
                    <p className='font-bold text-teal-500 hover:underline'>
                        {isVietnames ? 'Đăng nhập' : 'Sign in'}
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
