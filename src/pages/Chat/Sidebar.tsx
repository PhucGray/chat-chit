import { Icon } from '@iconify/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabType } from '../../types';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

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
    return (
        <div className='min-w-[75px] h-screen bg-gray-800 text-[30px] text-[#B1B1B1] flex flex-col items-center justify-between py-[25px] space-y-7'>
            <div className='space-y-10'>
                {icons &&
                    icons.map(({ icon, activeIcon, tab }) => (
                        <Icon
                            key={icon}
                            className={`sidebar-icon ${
                                currentTab === tab && 'text-teal-500'
                            }`}
                            icon={currentTab === tab ? activeIcon : icon}
                            onClick={() => setTab(tab)}
                        />
                    ))}
            </div>

            <Icon
                onClick={async () => {
                    signOut(auth);
                    navigate('/sign-in');
                }}
                className='sidebar-icon'
                icon='carbon:logout'
            />
        </div>
    );
};

export default Sidebar;
