import { Icon } from '@iconify/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setLoading } from '../../features/loading/loadingSlide';
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
    return (
        <div className='w-[65px] md:w-[70px] xl:w-[75px] h-screen py-[10px] md:py-[10px] xl:py-[15px] bg-gray-800 text-[25px] md:text-[27px] xl:text-[30px] text-[#B1B1B1] flex flex-col items-center justify-between'>
            <div className='space-y-10 flex flex-col'>
                {icons &&
                    icons.map(({ icon, activeIcon, tab }) => (
                        <button
                            key={icon}
                            className={`p-[8px] rounded-[15px] ${
                                currentTab === tab
                                    ? 'text-white bg-teal-500'
                                    : 'text-gray-400'
                            } hover:bg-teal-500 hover:text-white`}>
                            <Icon
                                icon={currentTab === tab ? activeIcon : icon}
                                onClick={() => {
                                    setTab(tab);
                                    sessionStorage.setItem('currentTab', tab);
                                }}
                            />
                        </button>
                    ))}
            </div>

            <button className='p-[8px] rounded-[15px] bg-gray-600 text-teal-500 hover:bg-teal-500 hover:text-white'>
                <Icon
                    onClick={async () => {
                        dispatch(setLoading(true));
                        await logout();
                        dispatch(setLoading(false));

                        navigate('/sign-in', { replace: true });
                    }}
                    icon='carbon:logout'
                />
            </button>
        </div>
    );
};

export default Sidebar;
