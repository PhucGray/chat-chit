import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FormAddFriend from '../../components/FormAddFriend';
import { selectUser, setUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import { TabType, UserType } from '../../types';
import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';

const Chat = () => {
    const [tab, setTab] = useState(
        () => (sessionStorage.getItem('currentTab') as TabType) || 'chat',
    );

    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(
        () =>
            onSnapshot(doc(db, 'users', user?.fieldId || 'random'), (doc) => {
                dispatch(
                    setUser({ ...doc.data(), fieldId: doc.id } as UserType),
                );
            }),

        [user?.fieldId],
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

                <FormAddFriend />
            </div>
        </>
    );
};

export default Chat;
