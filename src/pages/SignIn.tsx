import { Icon } from '@iconify/react';
import { MutableRefObject, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import ButtonSignInWithGG from '../components/ButtonSignInWithGG';
import { setLoading } from '../features/loading/loadingSlice';
import { signIn } from '../firebase';
import SignInImg from '../images/sign-in.png';
import { SubmitFormType } from '../types';
import { validateEmail, validatePassword } from '../utils/validateAuth';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const dispatch = useAppDispatch();

    const handleSignInWithEmailAndPassword = async (e: SubmitFormType) => {
        e.preventDefault();

        //#region validate
        const validateEmailMsg = validateEmail(email);
        const validatePasswordMsg = validatePassword(password);

        let isValid = true;

        if (validateEmailMsg) {
            setEmailError(validateEmailMsg);
            emailRef.current.focus();
            isValid = false;
        }

        if (validatePasswordMsg) {
            setPasswordError(validatePasswordMsg);
            passwordRef.current.focus();
            isValid = false;
        }
        //#endregion

        if (isValid) {
            dispatch(setLoading({ state: true, message: 'Đang đăng nhập' }));

            try {
                await signIn(email, password);
            } catch (error) {
                setPasswordError('Email hoặc mật khẩu không chính xác');
                dispatch(setLoading({ state: false }));
            }
        }
    };

    return (
        <>
            {localStorage.getItem('authenticated') ? (
                <Navigate to='/chat' />
            ) : (
                <form
                    onSubmit={handleSignInWithEmailAndPassword}
                    className='flex px-[20px] pt-[20px] lg:pt-[40px] container'>
                    <img
                        className='flex-1 max-w-[50vw] hidden xl:block'
                        src={SignInImg}
                        alt='Sign in'
                    />

                    <div className='flex-1 max-w-[350px] space-y-4 mx-auto'>
                        <h1 className='text-[40px] font-bold mb-[20px]'>
                            Chào mừng trở lại
                        </h1>

                        <div className='space-y-2'>
                            <p className='font-semibold'>Email</p>
                            <input
                                ref={emailRef}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                onClick={() => setEmailError('')}
                                className='input-text w-full'
                                type='text'
                                placeholder='Nhập email của bạn'
                                autoFocus
                            />
                            <p className='error'>{emailError}</p>

                            <p className='font-semibold'>Mật khẩu</p>
                            <div className='relative'>
                                <input
                                    ref={passwordRef}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    onClick={() => setPasswordError('')}
                                    className='input-text w-full'
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder='Nhập mật khẩu của bạn'
                                />

                                <Icon
                                    icon={
                                        isVisible
                                            ? 'gridicons:visible'
                                            : 'gridicons:not-visible'
                                    }
                                    fontSize={23}
                                    className='absolute right-[10px] top-[25%] cursor-pointer'
                                    onClick={() => setIsVisible(!isVisible)}
                                />
                            </div>
                            <p className='error'>{passwordError}</p>
                        </div>

                        <p className='text-right'>Quên mật khẩu ?</p>

                        <div className='space-y-2'>
                            <button
                                type='submit'
                                className='btn py-[13px] w-full'>
                                Đăng nhập
                            </button>

                            <p className='text-[18px] italic text-gray-500 text-center'>
                                hoặc
                            </p>

                            <ButtonSignInWithGG />
                        </div>

                        <div className='flex justify-center space-x-2'>
                            <p>Chưa có tài khoản ?</p>
                            <Link to='/sign-up'>
                                <p className='font-bold text-teal-500 hover:underline'>
                                    Đăng ký
                                </p>
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default SignIn;
