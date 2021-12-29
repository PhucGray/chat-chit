import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectLanguage } from '../features/setting/settingSlice';
import HomeImg from '../images/home.png';

const Home = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/sign-in');
    };

    const handleSignUpClick = () => {
        navigate('/sign-up');
    };

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <>
            <Helmet async>
                <title>
                    Chat chit - Trò chuyện trực tuyến, kết nối và chia sẽ
                </title>
                <meta
                    name='title'
                    content='Chat chit - Trò chuyện trực tuyến, kết nối và chia sẽ'
                />

                <meta
                    name='description'
                    content='Chat chit - Trò chuyện trực tuyến với bạn bè, người thân yêu thương của bạn. Cùng nhau kết nối, cùng nhau chia sẽ. Chat chit miễn phí và mãi mãi là như thế.'
                />

                <link rel='canonical' href='https://chatchit.vercel.app' />
                {/* social */}

                <meta property='og:type' content='website' />
                <meta property='og:url' content='https://chatchit.vercel.app' />
                <meta
                    property='og:title'
                    content='Chat chit - Trò chuyện trực tiếp, kết nối và chia sẽ'
                />
                <meta
                    property='og:description'
                    content='Chat chit - Trò chuyện trực tuyến với bạn bè, người thân yêu thương của bạn. Cùng nhau kết nối, cùng nhau chia sẽ. Chat chit miễn phí và mãi mãi là như thế.'
                />
                <meta
                    property='og:image'
                    content='https://chatchit.vercel.app/home.png'
                />

                {/* Twitter */}

                <meta property='twitter:card' content='summary_large_image' />
                <meta
                    property='twitter:url'
                    content='https://chatchit.vercel.app'
                />
                <meta
                    property='twitter:title'
                    content='Chat chit - Trò chuyện trực tiếp, kết nối và chia sẽ'
                />
                <meta
                    property='twitter:description'
                    content='Chat chit - Trò chuyện trực tuyến với bạn bè, người thân yêu thương của bạn. Cùng nhau kết nối, cùng nhau chia sẽ. Chat chit miễn phí và mãi mãi là như thế.'
                />
                <meta
                    property='twitter:image'
                    content='https://chatchit.vercel.app/home.png'
                />
            </Helmet>

            <div className='container'>
                <div className='flex px-[20px]'>
                    <div className='flex-1'>
                        <h1
                            className='text-[50px] text-center lg:text-[55px]
                        animate-fallDown'>
                            Chat chit
                        </h1>

                        <p
                            className='text-[25px] mx-auto mt-[10px] text-center 
                        sm:max-w-[80%] md:max-w-[60%] lg:max-w-[100%] xl:max-w-[460px] lg:text-[27px]
                        animate-ltr'>
                            {isVietnames
                                ? `Trò chuyện với bạn bè, người thân của bạn. Miễn phí và mãi mãi là như thế.`
                                : `Chat with your friends, your family. Free Forever.`}
                        </p>

                        <div
                            className='text-[20px] mx-auto mt-[10px] max-w-[50%] 
                        md:max-w-[30%] lg:max-w-[40%] lg:text-[25px]
                        animate-rtl'>
                            <div className='flex items-center space-x-2'>
                                <TickIcon />
                                <p>{isVietnames ? 'Miễn phí' : 'Free'}</p>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <TickIcon />
                                <p>{isVietnames ? 'Bảo mật' : 'Secure'}</p>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <TickIcon />
                                <p>{isVietnames ? 'Nhanh chóng' : 'Fast'}</p>
                            </div>
                        </div>

                        <div
                            className='flex flex-col items-center justify-center mt-[25px] space-y-2
                        animate-up'>
                            <button
                                className='btn min-w-[300px] py-[10px] text-[20px]'
                                onClick={handleSignInClick}>
                                {isVietnames ? 'Đăng nhập' : 'Sign in'}
                            </button>

                            <p className='text-[18px] italic text-gray-500'>
                                {isVietnames
                                    ? 'hoặc chưa có tài khoản'
                                    : `or don't have an account`}
                            </p>

                            <button
                                className='btn-outlined min-w-[300px] py-[10px] text-[20px]'
                                onClick={handleSignUpClick}>
                                {isVietnames ? 'Đăng ký' : 'Sign up'}
                            </button>
                        </div>
                    </div>

                    <img
                        className={`flex-1 max-w-[46vw] hidden lg:block
                        animate-fallDown`}
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
