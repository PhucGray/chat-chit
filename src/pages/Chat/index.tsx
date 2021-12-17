import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loading from '../../components/Loading';
import { selectLoading } from '../../features/loading/loadingSlice';
import { selectUser, setUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import { TabType, UserType } from '../../types';
import { getUserIDFromLocalStorage } from '../../utils/storage';
import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';

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
            </div>
        </>
    );
};

export default Chat;
