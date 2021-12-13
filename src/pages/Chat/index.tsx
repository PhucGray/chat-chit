import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Loading from '../../components/Loading';
import { setUser } from '../../features/user/userSlice';
import { usersCollectionRef } from '../../firebase';
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

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const data = await getDocs(usersCollectionRef);

                data.forEach((doc) => {
                    const user = doc.data() as UserType;
                    dispatch(setUser({ ...user, uid: doc.id }));
                });
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
