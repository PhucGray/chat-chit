import { Icon } from '@iconify/react';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setLoading } from '../../features/loading/loadingSlice';
import { setUser } from '../../features/user/userSlice';
import { logout } from '../../firebase';
import { TabType } from '../../types';

interface SidebarProps {
    currentTab: TabType;
    setTab: Dispatch<SetStateAction<TabType>>;
}

type SideBarIconType = {
    icon: string;
    activeIcon: string;
    tab: TabType;
};

const Sidebar: FC<SidebarProps> = ({ currentTab, setTab }) => {
    const icons = [
        {
            icon: 'bi:chat-text',
            activeIcon: 'bi:chat-text-fill',
            tab: 'chat',
        },
        {
            icon: 'teenyicons:users-outline',
            activeIcon: 'teenyicons:users-solid',
            tab: 'friend',
        },
        {
            icon: 'healthicons:ui-user-profile-outline',
            activeIcon: 'healthicons:ui-user-profile',
            tab: 'profile',
        },
        {
            icon: 'ant-design:setting-outlined',
            activeIcon: 'ant-design:setting-filled',
            tab: 'setting',
        },
    ] as SideBarIconType[];

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const closeSiderbar = () => setIsOpen(false);

    return (
        <>
            {isOpen && (
                <div
                    className='black-shadow opacity-70 lg:hidden'
                    onClick={closeSiderbar}
                />
            )}

            <div
                className={`h-screen w-[75px] flex flex-col items-center justify-between py-[10px] 
                transform ${isOpen ? 'translate-x-[0]' : 'translate-x-[-100%]'} 
                fixed left-0 z-20 
                lg:transform-none lg:static 
                md:py-[10px] md:text-[27px] xl:text-[30px] xl:py-[15px] 
                bg-gray-800 text-[25px] text-[#B1B1B1]`}>
                {isOpen || (
                    <Icon
                        onClick={() => setIsOpen(true)}
                        className='icon text-[40px] absolute top-[50%] right-0 transform translate-x-[100%] lg:hidden'
                        icon='bi:arrow-right-square-fill'
                    />
                )}

                <div className='space-y-10 flex flex-col'>
                    {icons &&
                        icons.map(({ icon, activeIcon, tab }) => (
                            <button
                                key={icon}
                                className={`p-[8px] rounded-[15px] ${
                                    currentTab === tab
                                        ? 'text-white bg-teal-500'
                                        : 'text-gray-400'
                                } hover:bg-teal-500 hover:text-white duration-300`}
                                onClick={() => {
                                    setTab(tab);
                                    sessionStorage.setItem('currentTab', tab);
                                    closeSiderbar();
                                }}>
                                <Icon
                                    icon={
                                        currentTab === tab ? activeIcon : icon
                                    }
                                />
                            </button>
                        ))}
                </div>

                <button
                    className='p-[8px] rounded-[15px] bg-gray-600 text-teal-500 hover:bg-teal-500 hover:text-white'
                    onClick={async () => {
                        dispatch(
                            setLoading({
                                state: true,
                                message: 'Đang đăng xuất',
                            }),
                        );

                        dispatch(setUser(null));

                        logout();

                        dispatch(setLoading({ state: false }));

                        navigate('/sign-in', { replace: true });
                    }}>
                    <Icon icon='carbon:logout' />
                </button>
            </div>
        </>
    );
};

export default Sidebar;
