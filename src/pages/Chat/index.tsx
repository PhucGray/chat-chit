import { useState } from 'react';
import { TabType } from '../../types';
import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';

const Chat = () => {
    const [tab, setTab] = useState('chat' as TabType);

    return (
        <div className='flex bg-gray-100'>
            <Sidebar currentTab={tab} setTab={setTab} />

            <div className='flex-1'>
                {tab === 'chat' && <ChatTab />}
                {tab === 'profile' && <ProfileTab />}
                {tab === 'friend' && <FriendsTab />}
                {tab === 'setting' && <SettingTab />}
            </div>
        </div>
    );
};

export default Chat;
