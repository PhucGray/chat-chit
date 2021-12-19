import HomeImg from '../images/home.png';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectLoading } from '../features/loading/loadingSlice';

const Home = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/sign-in');
    };

    const handleSignUpClick = () => {
        navigate('/sign-up');
    };

    return (
        <>
            <div className='container'>
                <div className='text-[30px] px-[20px] py-[5px]'>
                    <span>Logo</span>
                </div>

                <div className='flex px-[20px]'>
                    <div className='flex-1'>
                        <h1 className='text-[50px] text-center lg:text-[55px]'>
                            Chat chit
                        </h1>

                        <p className='text-[25px] mx-auto mt-[10px] text-center sm:max-w-[80%] md:max-w-[60%] lg:max-w-[75%] lg:text-[27px]'>
                            Trò chuyện với bạn bè, người thân của bạn. Miễn phí
                            và mãi mãi là như thế.
                        </p>

                        <div className='text-[20px] mx-auto mt-[10px] max-w-[50%] md:max-w-[30%] lg:max-w-[35%] lg:text-[25px]'>
                            <div className='flex items-center space-x-2'>
                                <TickIcon />
                                <p>Miễn phí</p>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <TickIcon />
                                <p>Bảo mật</p>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <TickIcon />
                                <p>Nhanh chóng</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center mt-[25px] space-y-2'>
                            <button
                                className='btn min-w-[300px] py-[10px] text-[20px]'
                                onClick={handleSignInClick}>
                                Đăng nhập
                            </button>

                            <p className='text-[18px] italic text-gray-500'>
                                hoặc chưa có tài khoản
                            </p>

                            <button
                                className='btn-outlined min-w-[300px] py-[10px] text-[20px]'
                                onClick={handleSignUpClick}>
                                Đăng ký
                            </button>
                        </div>
                    </div>

                    <img
                        className='flex-1 max-w-[46vw] hidden xl:block'
                        src={HomeImg}
                        alt='Home'
                    />
                </div>
            </div>
        </>
    );
};

const TickIcon = () => (
    <Icon fontSize={18} icon='teenyicons:shield-tick-solid' color='#14b8a6' />
);

export default Home;
