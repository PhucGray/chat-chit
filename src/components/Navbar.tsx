import LogoImg from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectLanguage, setLanguage } from '../features/setting/settingSlice';

const Language = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isVietnames = useAppSelector(selectLanguage) === 'vn';
    const isChatPage = location.pathname === '/chat';

    return (
        <div
            className='flex items-center justify-between mt-[10px] px-[20px]
        animate-fallDown'>
            <Link to='/'>
                <div className='flex items-center'>
                    <img className='w-[40px]' src={LogoImg} alt='Logo' />
                    <p className='font-bold text-[18px]'>Chat chit</p>
                </div>
            </Link>

            <div className='flex items-center gap-2'>
                {!isChatPage && (
                    <>
                        <span
                            className={`cursor-pointer hover:underline hover:text-teal-500 ${
                                isVietnames && 'text-teal-500 font-bold'
                            }`}
                            onClick={() => {
                                dispatch(setLanguage('vn'));
                            }}>
                            Tiếng Việt
                        </span>
                        <span>|</span>
                        <span
                            className={`cursor-pointer hover:underline hover:text-teal-500 ${
                                !isVietnames && 'text-teal-500 font-bold'
                            }`}
                            onClick={() => {
                                dispatch(setLanguage('en'));
                            }}>
                            English
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Language;
