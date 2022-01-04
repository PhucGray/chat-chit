import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectLanguage, setLanguage } from '../features/setting/settingSlice';

const Language = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isChatPage = location.pathname === '/chat';
    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <div
            className='flex items-center justify-between mt-[10px] px-[20px]
        animate-fallDown'>
            <Link to='/'>
                <div className='flex items-center'>
                    <p
                        className='font-bold text-[20px] font-mono'
                        title={isVietnames ? 'Trang chủ' : 'Home'}>
                        Chat chit
                    </p>
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
