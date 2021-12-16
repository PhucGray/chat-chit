import { Icon } from '@iconify/react';
import { reload, signInWithPopup, UserCredential } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setLoading } from '../features/loading/loadingSlide';
import { setUser } from '../features/user/userSlice';
import {
    auth,
    db,
    googleProvider,
    signIn,
    usersCollectionRef,
} from '../firebase';
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

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: SubmitFormType) => {
        e.preventDefault();

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

        if (isValid) {
            try {
                dispatch(setLoading(true));

                await signIn(email, password);

                dispatch(setLoading(false));

                navigate('/chat', { replace: true });
            } catch (error) {
                dispatch(setLoading(false));
                setPasswordError('Email hoặc mật khẩu không chính xác');
            }
        }
    };

    const handleGoogleClick = async () => {
        signInWithPopup(auth, googleProvider)
            .then(async (res: UserCredential) => {
                const { email, phoneNumber, photoURL, displayName, uid } =
                    res.user;

                const q = query(
                    collection(db, 'users'),
                    where('email', '==', email),
                );

                const data = await getDocs(q);

                if (data.empty) {
                    await addDoc(usersCollectionRef, {
                        uid,
                        email,
                        displayName,
                        photoURL,
                        phoneNumber,
                    });
                }

                localStorage.setItem('uid', uid);

                dispatch(
                    setUser({
                        uid,
                        email: email || '',
                        displayName: displayName || '',
                        photoURL: photoURL || '',
                        phoneNumber: phoneNumber || '',
                    }),
                );
            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(setLoading(false));

                navigate('/chat', { replace: true });
            });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
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
                        <button type='submit' className='btn py-[13px] w-full'>
                            Đăng nhập
                        </button>

                        <p className='text-[18px] italic text-gray-500 text-center'>
                            hoặc
                        </p>

                        <button
                            className='btn-outlined w-full py-[10px] flex items-center justify-center space-x-3'
                            onClick={handleGoogleClick}
                            type='button'>
                            <Icon
                                icon='flat-color-icons:google'
                                fontSize={30}
                            />
                            <p>Đăng nhập với Google</p>
                        </button>
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
        </div>
    );
};

export default SignIn;
