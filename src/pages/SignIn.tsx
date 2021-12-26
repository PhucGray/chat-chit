import { Icon } from '@iconify/react';
import { MutableRefObject, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ButtonSignInWithGG from '../components/ButtonSignInWithGG';
import { setLoading } from '../features/loading/loadingSlice';
import { selectLanguage } from '../features/setting/settingSlice';
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

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <>
            <Helmet async>
                <title>Chat chit - Chào mừng trở lại</title>
                <meta name='title' content='Chat chit - Chào mừng trở lại' />
                <meta
                    name='description'
                    content='Đăng nhập vào Chat chit để trò chuyện với bạn bè, người thân của bạn. Chat chit miễn phí và mãi mãi là như thế.'
                />

                <link rel='canonical' href='https://chatchit.vercel.app' />

                {/* social */}

                <meta property='og:type' content='website' />
                <meta
                    property='og:url'
                    content='https://chatchit.vercel.app/sign-in'
                />
                <meta
                    property='og:title'
                    content='Chat chit - Chào mừng trở lại'
                />
                <meta
                    property='og:description'
                    content='Đăng nhập vào Chat chit để trò chuyện với bạn bè, người thân của bạn. Chat chit miễn phí và mãi mãi là như thế.'
                />
                <meta
                    property='og:image'
                    content='https://chatchit.vercel.app/sign_in.png'
                />

                {/* Twitter */}

                <meta property='twitter:card' content='summary_large_image' />
                <meta
                    property='twitter:url'
                    content='https://chatchit.vercel.app'
                />
                <meta
                    property='twitter:title'
                    content='Chat chit - Chào mừng trở lại'
                />
                <meta
                    property='twitter:description'
                    content='Chat chit là trang web trò chuyện với bạn bè, người thân của bạn. Chat chit miễn phí và mãi mãi là như thế.'
                />
                <meta
                    property='twitter:image'
                    content='https://chatchit.vercel.app/sign_in.png'
                />
            </Helmet>

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
                            {isVietnames ? 'Chào mừng trở lại' : 'Welcome back'}
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
                                placeholder={
                                    isVietnames
                                        ? 'Nhập email của bạn'
                                        : 'Enter your email'
                                }
                                autoFocus
                            />
                            <p className='error'>{emailError}</p>

                            <p className='font-semibold'>
                                {isVietnames ? 'Mật khẩu' : 'Password'}
                            </p>
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
                                    placeholder={
                                        isVietnames
                                            ? 'Nhập mật khẩu của bạn'
                                            : 'Enter your password'
                                    }
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

                        <p className='text-right'>
                            {isVietnames
                                ? 'Quên mật khẩu ?'
                                : 'Forgot password ?'}
                        </p>

                        <div className='space-y-2'>
                            <button
                                type='submit'
                                className='btn py-[13px] w-full'>
                                {isVietnames ? 'Đăng nhập' : 'Sign in'}
                            </button>

                            <p className='text-[18px] italic text-gray-500 text-center'>
                                {isVietnames ? 'hoặc' : 'or'}
                            </p>

                            <ButtonSignInWithGG />
                        </div>

                        <div className='flex justify-center space-x-2'>
                            <p>
                                {isVietnames
                                    ? 'Chưa có tài khoản ?'
                                    : "Don't have an account ?"}
                            </p>
                            <Link to='/sign-up'>
                                <p className='font-bold text-teal-500 hover:underline'>
                                    {isVietnames ? 'Đăng ký' : 'Sign up'}
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
