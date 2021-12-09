import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='w-[75px] h-screen bg-gray-800 text-[30px] text-[#B1B1B1] flex flex-col items-center justify-between py-[25px] space-y-7'>
            <div className='space-y-10'>
                <Icon className='sidebar-icon' icon='bi:chat-text-fill' />
                <Icon
                    className='sidebar-icon'
                    icon='healthicons:ui-user-profile'
                />
                <Icon className='sidebar-icon' icon='fa-solid:user-friends' />
                <Icon
                    className='sidebar-icon'
                    icon='ant-design:setting-filled'
                />
            </div>

            <Link to='/sign-in'>
                <Icon className='sidebar-icon' icon='carbon:logout' />
            </Link>
        </div>
    );
};

export default Sidebar;
