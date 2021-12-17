import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Loading from '../../components/Loading';
import { setUser } from '../../features/user/userSlice';
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

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);

            const uid = localStorage.getItem('uid');

            // const uid = getUserIDFromLocalStorage();

            const q = query(collection(db, 'users'), where('uid', '==', uid));

            try {
                const data = await getDocs(q);

                dispatch(setUser(data.docs[0].data() as UserType));
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };
        getUsers();
    }, []);

    return (
        <>
            <div className='flex bg-gray-100'>
                <Sidebar currentTab={tab} setTab={setTab} />

                {loading ? (
                    <Loading msg='Đang đăng nhập' />
                ) : (
                    <div className='flex-1'>
                        {tab === 'chat' && <ChatTab />}
                        {tab === 'profile' && <ProfileTab />}
                        {tab === 'friend' && <FriendsTab />}
                        {tab === 'setting' && <SettingTab />}
                    </div>
                )}
            </div>
        </>
    );
};

export default Chat;
