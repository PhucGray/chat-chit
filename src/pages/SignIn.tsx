import SignInImg from '../images/sign-in.png';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/chat');
    };

    return (
        <div className='flex px-[20px] py-[40px] container'>
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
                        className='input-text w-full'
                        type='text'
                        placeholder='Nhập email của bạn'
                    />

                    <p className='font-semibold'>Mật khẩu</p>
                    <div className='relative'>
                        <input
                            className='input-text w-full'
                            type='password'
                            placeholder='Nhập mật khẩu của bạn'
                        />

                        <Icon
                            icon='gridicons:not-visible'
                            fontSize={23}
                            className='absolute right-[10px] top-[25%] cursor-pointer'
                        />

                        {/* <Icon icon='gridicons:visible' /> */}
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            className='rounded text-teal-500 cursor-pointer focus:outline-none focus:ring-offset-0 focus:border-none'
                        />
                        <p>Ghi nhớ tài khoản</p>
                    </div>

                    <p>Quên mật khẩu ?</p>
                </div>

                <div className='space-y-2'>
                    <button
                        className='btn py-[13px] w-full'
                        onClick={handleSignInClick}>
                        Đăng nhập
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
                    <p>Chưa có tài khoản ?</p>
                    <Link to='/sign-up'>
                        <p className='font-bold text-teal-500 hover:underline'>
                            Đăng ký
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
