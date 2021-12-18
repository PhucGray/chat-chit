import { Icon } from '@iconify/react';
import { useState } from 'react';
import { TabType } from '../../types';
import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';
import AvatarImg from '../../images/defaultAvatar.png';

const Chat = () => {
    const [tab, setTab] = useState(
        () => (sessionStorage.getItem('currentTab') as TabType) || 'chat',
    );

    return (
        <>
            <div className='flex bg-gray-100'>
                <Sidebar currentTab={tab} setTab={setTab} />

                <div className='flex-1'>
                    {tab === 'chat' && <ChatTab />}
                    {tab === 'profile' && <ProfileTab />}
                    {tab === 'friend' && <FriendsTab />}
                    {tab === 'setting' && <SettingTab />}
                </div>

                {/* <FormAddFriend /> */}
            </div>
        </>
    );
};

export const FormAddFriend = () => {
    return (
        <div className='fixed-center translate-y-[-50%] bg-white w-screen max-w-[500px] rounded-[10px] p-[20px] space-y-3'>
            <div className='flex items-center justify-between'>
                <p className='text-[20px] font-bold'>Thêm bạn bè</p>

                <Icon className='icon text-[30px]' icon='eva:close-fill' />
            </div>

            <div className='h-[45px] flex justify-center justify-items-stretch space-x-2'>
                <input
                    className='input-text'
                    type='text'
                    placeholder='Nhập tên hoặc email'
                />
                <button className='btn px-[20px] flex items-center sm:space-x-2'>
                    <Icon fontSize={25} icon='carbon:search' />
                    <p className='hidden sm:block'>Tìm kiếm</p>
                </button>
            </div>

            <hr />

            <div className='ml-[15px] mt-[10px] py-[10px] flex items-center justify-between space-x-2'>
                <div className='flex items-center  space-x-2'>
                    <img
                        className='h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] rounded-full border'
                        src={AvatarImg}
                        alt='Home'
                    />

                    <p className='text-[16px] sm:text-[18px] max-w-[250px] truncate'>
                        Nguyen Hoang Minh Tam à àkjaf akfaf ần
                    </p>
                </div>

                <button className='btn w-[80px] sm:w-[120px] py-[7px]'>
                    Kết bạn
                </button>
            </div>
        </div>
    );
};

export default Chat;
