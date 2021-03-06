import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ButtonSignInWithGG from '../components/ButtonSignInWithGG';
import GroupControl from '../components/GroupControl';
import { setLoading } from '../features/loading/loadingSlice';
import { selectLanguage } from '../features/setting/settingSlice';
import { signIn } from '../firebase';
import SignInImg from '../images/sign-in.png';
import { SubmitFormType } from '../types';
import { validateEmail, validatePassword } from '../utils/validateAuth';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const dispatch = useAppDispatch();
    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    const validateFields = async () => {
        const validateEmailMsg = validateEmail(email, isVietnames);
        const validatePasswordMsg = validatePassword(password, isVietnames);

        let isValid = true;

        if (validatePasswordMsg) {
            setPasswordError(validatePasswordMsg);
            passwordRef.current.focus();
            isValid = false;
        }

        if (validateEmailMsg) {
            setEmailError(validateEmailMsg);
            emailRef.current.focus();
            isValid = false;
        }

        return isValid;
    };

    const handleSignInWithEmailAndPassword = async (e: SubmitFormType) => {
        e.preventDefault();

        const isValid = await validateFields();

        if (isValid) {
            dispatch(setLoading({ state: true, message: '??ang ????ng nh???p' }));

            try {
                await signIn(email, password);
            } catch (error) {
                setPasswordError('Email ho???c m???t kh???u kh??ng ch??nh x??c');
                dispatch(setLoading({ state: false }));
            }
        }
    };

    useEffect(() => {
        if (emailError || passwordError) validateFields();
    }, [isVietnames]);

    return (
        <>
            <Helmet async>
                <title>Chat chit - Ch??o m???ng tr??? l???i</title>
                <meta name='title' content='Chat chit - Ch??o m???ng tr??? l???i' />
                <meta
                    name='description'
                    content='????ng nh???p v??o Chat chit ????? tr?? chuy???n v???i b???n b??, ng?????i th??n c???a b???n. Chat chit mi???n ph?? v?? m??i m??i l?? nh?? th???.'
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
                    content='Chat chit - Ch??o m???ng tr??? l???i'
                />
                <meta
                    property='og:description'
                    content='????ng nh???p v??o Chat chit ????? tr?? chuy???n v???i b???n b??, ng?????i th??n c???a b???n. Chat chit mi???n ph?? v?? m??i m??i l?? nh?? th???.'
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
                    content='Chat chit - Ch??o m???ng tr??? l???i'
                />
                <meta
                    property='twitter:description'
                    content='Chat chit l?? trang web tr?? chuy???n v???i b???n b??, ng?????i th??n c???a b???n. Chat chit mi???n ph?? v?? m??i m??i l?? nh?? th???.'
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
                    className='flex items-start px-[20px] pt-[20px] container'>
                    <img
                        className='flex-1 max-w-[50vw] hidden xl:block animate-fallDown'
                        src={SignInImg}
                        alt='Sign in'
                    />

                    <div
                        className='flex-1 max-w-[350px] space-y-4 mx-auto
                    animate-up'>
                        <h1 className='text-[40px] font-bold mb-[20px]'>
                            {isVietnames ? 'Ch??o m???ng tr??? l???i' : 'Welcome back'}
                        </h1>

                        <GroupControl
                            key='Email'
                            label='Email'
                            error={emailError}>
                            <input
                                ref={emailRef}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                onClick={() => setEmailError('')}
                                className={`input-text w-full ${
                                    emailError && 'error'
                                }`}
                                type='text'
                                placeholder={
                                    isVietnames
                                        ? 'Nh???p email c???a b???n'
                                        : 'Enter your email'
                                }
                                autoFocus
                            />
                        </GroupControl>

                        <GroupControl
                            key='Password'
                            label={isVietnames ? 'M???t kh???u' : 'Password'}
                            error={passwordError}>
                            <input
                                ref={passwordRef}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError('');
                                }}
                                onClick={() => setPasswordError('')}
                                className={`input-text w-full ${
                                    passwordError && 'error'
                                }`}
                                type={isVisible ? 'text' : 'password'}
                                placeholder={
                                    isVietnames
                                        ? 'Nh???p m???t kh???u c???a b???n'
                                        : 'Enter your password'
                                }
                            />

                            <div
                                className='text-[23px] absolute right-[10px] top-[25%] cursor-pointer'
                                onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? (
                                    <MdVisibility />
                                ) : (
                                    <MdVisibilityOff />
                                )}
                            </div>
                        </GroupControl>

                        <Link to='/forgot-password'>
                            <p className='text-right hover:underline'>
                                {isVietnames
                                    ? 'Qu??n m???t kh???u ?'
                                    : 'Forgot password ?'}
                            </p>
                        </Link>

                        <div className='space-y-2'>
                            <button
                                type='submit'
                                className='btn py-[10px] w-full'>
                                {isVietnames ? '????ng nh???p' : 'Sign in'}
                            </button>

                            <p className='italic text-gray-500 text-center'>
                                {isVietnames ? 'ho???c' : 'or'}
                            </p>

                            <ButtonSignInWithGG />
                        </div>

                        <div className='flex justify-center space-x-2'>
                            <p>
                                {isVietnames
                                    ? 'Ch??a c?? t??i kho???n ?'
                                    : "Don't have an account ?"}
                            </p>
                            <Link to='/sign-up'>
                                <p className='font-bold text-teal-500 hover:underline'>
                                    {isVietnames ? '????ng k??' : 'Sign up'}
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
