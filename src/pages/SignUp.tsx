import { Icon } from '@iconify/react';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setLoading } from '../features/loading/loadingSlice';
import { setUser } from '../features/user/userSlice';
import {
    auth,
    db,
    googleProvider,
    signup,
    usersCollectionRef,
} from '../firebase';
import SignUpImg from '../images/sign-up.png';
import { SubmitFormType, UserType } from '../types';
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '../utils/validateAuth';

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

    const navigate = useNavigate();

    const handleSignUpSubmit = async (e: SubmitFormType) => {
        e.preventDefault();

        const validateUsernameMsg = validateUsername(username);
        const validateEmailMsg = validateEmail(email);
        const validatePasswordMsg = validatePassword(password);

        let isValid = true;

        if (validateUsernameMsg) {
            setUsernameError(validateUsernameMsg);
            usernameRef.current.focus();
            isValid = false;
        }

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
            setEmailError('Email đã tồn tại');
        }

        if (!dbUsername.empty) {
            isValid = false;
            setUsernameError('Tên người dùng đã tồn tại');
        }

        if (isValid) {
            try {
                dispatch(
                    setLoading({ state: true, message: 'Đang tạo tài khoản' }),
                );

                const newUser = await signup(email, password);

                const newDoc = await addDoc(usersCollectionRef, {
                    uid: newUser.user.uid,
                    email,
                    displayName: username,
                } as UserType);

                const newUserRef = doc(db, 'users', newDoc.id);

                await updateDoc(newUserRef, { fieldId: newDoc.id });

                dispatch(setLoading({ state: false }));

                navigate('/chat');
            } catch (error) {
                console.log(error);
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
                        email,
                        displayName,
                        uid,
                        photoURL,
                        phoneNumber,
                    });
                }

                navigate('/sign-in');
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <form
                onSubmit={handleSignUpSubmit}
                className='flex px-[20px] py-[40px] container'>
                <div className='flex-1 max-w-[350px] mx-auto space-y-5'>
                    <div className='text-center'>
                        <h1 className='text-[25px] lg:text-[30px] font-bold'>
                            Tham gia với chúng tôi
                        </h1>
                    </div>

                    <div className='space-y-2'>
                        <p className='font-semibold'>Tên người dùng</p>
                        <input
                            ref={usernameRef}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError('');
                            }}
                            onClick={() => setUsernameError('')}
                            className='input-text w-full'
                            type='text'
                            placeholder='Nhập email của bạn'
                        />
                        <p className='error'>{usernameError}</p>

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

                    <div className='space-y-2'>
                        <button
                            type='submit'
                            className='btn py-[10px] lg:py-[13px] w-full'>
                            Đăng ký
                        </button>

                        <p className='text-sm lg:text-base italic text-gray-500 text-center'>
                            hoặc
                        </p>

                        <button
                            className='btn-outlined w-full py-[6px] lg:py-[10px] flex items-center justify-center space-x-3'
                            onClick={handleGoogleClick}>
                            <Icon
                                icon='flat-color-icons:google'
                                fontSize={30}
                            />
                            <p>Đăng nhập với Google</p>
                        </button>
                    </div>

                    <div className='flex justify-center space-x-2'>
                        <p>Đã có tài khoản ?</p>
                        <Link to='/sign-in'>
                            <p className='font-bold text-teal-500 hover:underline'>
                                Đăng nhập
                            </p>
                        </Link>
                    </div>
                </div>

                <img
                    className='flex-1 max-w-[50vw] hidden xl:block'
                    src={SignUpImg}
                    alt='Sign in'
                />
            </form>
        </>
    );
};

export default SignUp;
