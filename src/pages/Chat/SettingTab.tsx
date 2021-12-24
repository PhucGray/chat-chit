import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme, setTheme } from '../../features/theme/themeSlice';

const SettingTab = () => {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();

    return (
        <div className='h-screen w-full grid place-items-center'>
            <div
                className='h-full w-full max-w-[600px] max-h-[450px] p-4 rounded-[10px] 
            bg-white dark:bg-trueGray-700 dark:text-gray-400'>
                <p className='font-semibold text-[30px] text-center mb-5'>
                    Cài đặt
                </p>

                <div className='grid grid-cols-1 place-items-center gap-y-5 px-[40px] text-[25px] sm:grid-cols-2'>
                    <div>
                        <div className='flex items-center space-x-2 mb-2'>
                            <Icon icon='lucide:languages' />
                            <p>Ngôn ngữ</p>
                        </div>

                        <div
                            className='select'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLanguageOpen(true);

                                window.addEventListener('click', (e) => {
                                    setIsLanguageOpen(false);
                                });
                            }}>
                            <p>Tiếng Việt</p>
                            <Icon
                                icon='ic:outline-arrow-drop-down'
                                fontSize={40}
                            />

                            {isLanguageOpen && (
                                <div className='absolute top-full py-[5px] border w-full transform translate-y-2 rounded-[10px] bg-white'>
                                    <button className='w-full text-left px-[10px] flex items-center justify-between hover:bg-teal-500 hover:text-white group'>
                                        Tiếng Việt
                                        <Icon
                                            icon='ant-design:check-outlined'
                                            className='text-teal-500 group-hover:text-white'
                                        />
                                    </button>
                                    <button className='w-full text-left px-[10px] flex items-center justify-between hover:bg-teal-500 hover:text-white group'>
                                        English
                                        {/* <Icon
                                        icon='ant-design:check-outlined'
                                        className='text-teal-500 group-hover:text-white'
                                    /> */}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center space-x-2 mb-3'>
                            <Icon icon='fluent:dark-theme-24-regular' />
                            <p>Giao diện</p>
                        </div>

                        <div className='flex space-x-6'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    className='radio'
                                    type='radio'
                                    name='theme'
                                    id='light'
                                    checked={theme === 'light'}
                                    onClick={() => dispatch(setTheme('light'))}
                                />
                                <label
                                    className='cursor-pointer'
                                    htmlFor='light'>
                                    Sáng
                                </label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <input
                                    className='radio'
                                    type='radio'
                                    name='theme'
                                    id='dark'
                                    checked={theme === 'dark'}
                                    onClick={() => dispatch(setTheme('dark'))}
                                />
                                <label
                                    className='cursor-pointer'
                                    htmlFor='dark'>
                                    Tối
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <div>
                        <div className='flex items-center space-x-2 mb-3'>
                            <Icon icon='clarity:notification-solid' />
                            <p>Thông báo</p>
                        </div>

                        <div className='flex space-x-6'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    className='radio'
                                    type='radio'
                                    name='notification'
                                    id='on'
                                />
                                <label className='cursor-pointer' htmlFor='on'>
                                    Mở
                                </label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <input
                                    className='radio'
                                    type='radio'
                                    name='notification'
                                    id='off'
                                />
                                <label className='cursor-pointer' htmlFor='off'>
                                    Tắt
                                </label>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SettingTab;
