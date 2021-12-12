import SignUpImg from '../images/sign-up.png';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validateAuth';
import { SubmitFormType } from '../types';
import { MutableRefObject, useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const navigate = useNavigate();

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
                await createUserWithEmailAndPassword(auth, email, password);
                navigate('/sign-in');
            } catch (error) {
                console.log(error);
                setEmailError('Email đã tồn tại');
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex px-[20px] py-[40px] container'>
            <div className='flex-1 max-w-[350px] mx-auto space-y-5'>
                <div className='text-center'>
                    <h1 className='text-[40px] font-bold'>Tham gia với</h1>

                    <h1 className='text-[40px] font-bold'>chúng tôi</h1>
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
                </div>

                <div className='space-y-2'>
                    <button type='submit' className='btn py-[13px] w-full'>
                        Đăng ký
                    </button>

                    <p className='text-[18px] italic text-gray-500 text-center'>
                        hoặc
                    </p>

                    <button className='btn-outlined w-full py-[10px] flex items-center justify-center space-x-3'>
                        <Icon icon='flat-color-icons:google' fontSize={30} />
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
    );
};

export default SignUp;
