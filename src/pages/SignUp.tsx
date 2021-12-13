import { Icon } from '@iconify/react';
import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setLoading } from '../features/loading/loadingSlide';
import { signup } from '../firebase';
import SignUpImg from '../images/sign-up.png';
import { SubmitFormType } from '../types';
import { validateEmail, validatePassword } from '../utils/validateAuth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const dispatch = useAppDispatch();

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const confirmPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitFormType) => {
        e.preventDefault();

        const validateEmailMsg = validateEmail(email);
        const validatePasswordMsg = validatePassword(password);
        const validateConfirmPasswordMsg = validatePassword(confirmPassword);

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

        if (validateConfirmPasswordMsg) {
            setConfirmPasswordError(validateConfirmPasswordMsg);
            confirmPasswordRef.current.focus();
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu không khớp');
            confirmPasswordRef.current.focus();
            isValid = false;
        }

        if (isValid) {
            try {
                dispatch(setLoading(true));
                await signup(email, password);
                dispatch(setLoading(false));

                navigate('/sign-in');
            } catch (error) {
                console.log(error);
                setEmailError('Email đã tồn tại');
            }
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='flex px-[20px] py-[40px] container'>
                <div className='flex-1 max-w-[350px] mx-auto space-y-5'>
                    <div className='text-center'>
                        <h1 className='text-[25px] lg:text-[30px] font-bold'>
                            Tham gia với chúng tôi
                        </h1>
                    </div>

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

                        <p className='font-semibold'>Xác nhận mật khẩu</p>
                        <div className='relative'>
                            <input
                                ref={confirmPasswordRef}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordError('');
                                }}
                                onClick={() => setConfirmPasswordError('')}
                                className='input-text w-full'
                                type={isVisible ? 'text' : 'password'}
                                placeholder='Xác nhận mật khẩu của bạn'
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
                        <p className='error'>{confirmPasswordError}</p>
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

                        <button className='btn-outlined w-full py-[6px] lg:py-[10px] flex items-center justify-center space-x-3'>
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
