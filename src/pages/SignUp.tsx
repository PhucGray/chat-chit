import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ButtonSignInWithGG from '../components/ButtonSignInWithGG';
import GroupControl from '../components/GroupControl';
import { setIsAlertOpen } from '../features/alert/alertSlice';
import { setLoading } from '../features/loading/loadingSlice';
import { selectLanguage } from '../features/setting/settingSlice';
import { db, signup, usersCollectionRef } from '../firebase';
import SignUpImg from '../images/sign-up.png';
import { SubmitFormType, UserType } from '../types';
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '../utils/validateAuth';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const dispatch = useAppDispatch();

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;

    const validateFields = async () => {
        const validateUsernameMsg = validateUsername(username, isVietnames);
        const validateEmailMsg = validateEmail(email, isVietnames);
        const validatePasswordMsg = validatePassword(password, isVietnames);

        let isValid = true;

        if (validatePasswordMsg) {
            setPasswordError(validatePasswordMsg);
            isValid = false;
            passwordRef.current.focus();
        }

        if (validateEmailMsg) {
            setEmailError(validateEmailMsg);
            isValid = false;
            emailRef.current.focus();
        }

        if (validateUsernameMsg) {
            setUsernameError(validateUsernameMsg);
            usernameRef.current.focus();
            isValid = false;
        }

        const checkEmailExists = query(
            collection(db, 'users'),
            where('email', '==', email),
        );

        const checkUsernameExists = query(
            collection(db, 'users'),
            where('displayName', '==', username),
        );

        const dbEmail = await getDocs(checkEmailExists);
        const dbUsername = await getDocs(checkUsernameExists);

        if (!dbEmail.empty) {
            isValid = false;
            setEmailError('Email ???? t???n t???i');
            emailRef.current.focus();
        }

        if (!dbUsername.empty) {
            isValid = false;
            setUsernameError('T??n ng?????i d??ng ???? t???n t???i');
            usernameRef.current.focus();
        }

        return isValid;
    };

    const handleCreateUserWithEmailAndPassowrd = async (e: SubmitFormType) => {
        e.preventDefault();

        //#region validate
        const isValid = await validateFields();

        //#endregion

        if (isValid) {
            try {
                dispatch(
                    setLoading({ state: true, message: '??ang t???o t??i kho???n' }),
                );

                const newUser = await signup(email, password);

                await addDoc(usersCollectionRef, {
                    uid: newUser.user.uid,
                    email,
                    displayName: username,
                } as UserType);

                dispatch(setIsAlertOpen(true));
                dispatch(setLoading({ state: false }));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    useEffect(() => {
        if (emailError || passwordError || usernameError) validateFields();
    }, [isVietnames]);

    return (
        <>
            <Helmet async>
                <title>Chat chit - Tham gia v???i ch??ng t??i</title>
                <meta
                    name='title'
                    content='Chat chit - Tham gia v???i ch??ng t??i'
                />
                <meta
                    name='description'
                    content='????ng k?? v??o Chat chit ????? tr?? chuy???n v???i b???n b??, ng?????i th??n c???a b???n. Chat chit mi???n ph?? v?? m??i m??i l?? nh?? th???.'
                />

                <link rel='canonical' href='https://chatchit.vercel.app' />
                {/* social */}

                <meta property='og:type' content='website' />
                <meta
                    property='og:url'
                    content='https://chatchit.vercel.app/sign-up'
                />
                <meta
                    property='og:title'
                    content='Chat chit - Tham gia v???i ch??ng t??i'
                />
                <meta
                    property='og:description'
                    content='????ng k?? v??o Chat chit ????? tr?? chuy???n v???i b???n b??, ng?????i th??n c???a b???n. Chat chit mi???n ph?? v?? m??i m??i l?? nh?? th???.'
                />
                <meta
                    property='og:image'
                    content='https://chatchit.vercel.app/sign_up.png'
                />

                {/* Twitter */}

                <meta property='twitter:card' content='summary_large_image' />
                <meta
                    property='twitter:url'
                    content='https://chatchit.vercel.app/sign-up'
                />
                <meta
                    property='twitter:title'
                    content='Chat chit - Tham gia v???i ch??ng t??i'
                />
                <meta
                    property='twitter:description'
                    content='????ng k?? v??o Chat chit ????? tr?? chuy???n v???i b???n b??, ng?????i th??n c???a b???n. Chat chit mi???n ph?? v?? m??i m??i l?? nh?? th???.'
                />
                <meta
                    property='twitter:image'
                    content='https://chatchit.vercel.app/sign-up.png'
                />
            </Helmet>

            {localStorage.getItem('authenticated') ? (
                <Navigate to='/chat' />
            ) : (
                <div className='flex items-start px-[20px] pt-[20px] container'>
                    <form
                        onSubmit={handleCreateUserWithEmailAndPassowrd}
                        className='flex-1 max-w-[350px] mx-auto space-y-3
                        animate-up'>
                        <div className='text-center'>
                            <h1 className='text-[25px] lg:text-[30px] font-bold'>
                                {isVietnames
                                    ? 'Tham gia v???i ch??ng t??i'
                                    : 'Join with us'}
                            </h1>
                        </div>

                        <GroupControl
                            key='Username'
                            label={isVietnames ? 'T??n ng?????i d??ng' : 'Username'}
                            error={usernameError}>
                            <input
                                ref={usernameRef}
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError('');
                                }}
                                onClick={() => setUsernameError('')}
                                className={`input-text w-full ${
                                    usernameError && 'error'
                                }`}
                                type='text'
                                placeholder={
                                    isVietnames
                                        ? 'Nh???p t??n ng?????i d??ng'
                                        : 'Enter username'
                                }
                                autoFocus
                            />
                        </GroupControl>

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

                        <div className='space-y-2'>
                            <button
                                type='submit'
                                className='btn py-[10px] w-full'>
                                {isVietnames ? '????ng k??' : 'Sign up'}
                            </button>

                            <p className=' italic text-gray-500 text-center'>
                                {isVietnames ? 'ho???c' : 'or'}
                            </p>

                            <ButtonSignInWithGG />
                        </div>

                        <div className='flex justify-center space-x-2'>
                            <p>
                                {isVietnames
                                    ? '???? c?? t??i kho???n ?'
                                    : 'Already have an account ?'}
                            </p>
                            <Link to='/sign-in'>
                                <p className='font-bold text-teal-500 hover:underline'>
                                    {isVietnames ? '????ng nh???p' : 'Sign in'}
                                </p>
                            </Link>
                        </div>
                    </form>

                    <img
                        className='object-top flex-1 max-w-[50vw] hidden xl:block animate-fallDown'
                        src={SignUpImg}
                        alt='Sign in'
                    />
                </div>
            )}
        </>
    );
};

export default SignUp;
