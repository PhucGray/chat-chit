import SignUpImg from '../images/sign-up.png';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/sign-in');
    };

    return (
        <div className='flex px-[20px] py-[40px] container'>
            <div className='flex-1 max-w-[350px] mx-auto space-y-5'>
                <div className='text-center'>
                    <h1 className='text-[40px] font-bold'>Tham gia với</h1>

                    <h1 className='text-[40px] font-bold'>chúng tôi</h1>
                </div>

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

                <div className='space-y-2'>
                    <button
                        className='btn py-[13px] w-full'
                        onClick={handleSignUpClick}>
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
        </div>
    );
};

export default SignUp;
