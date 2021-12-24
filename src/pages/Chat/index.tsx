import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Alert from '../../components/Alert';
import FormAddFriend from '../../components/FormAddFriend';
import { selectAlert } from '../../features/alert/alertSlice';
import {
    selectConversations,
    setSingleConversation,
} from '../../features/conversation/conversationSlice';
import { selectCurrentTab } from '../../features/tab/tabSlice';
import { selectTheme } from '../../features/theme/themeSlice';
import { selectUser, setFriends, setUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import { RoomType, UserType } from '../../types';
import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';

const Chat = () => {
    const dispatch = useAppDispatch();

    const currentTab = useAppSelector(selectCurrentTab);
    const user = useAppSelector(selectUser);
    const conversations = useAppSelector(selectConversations);
    const isAlertOpen = useAppSelector(selectAlert);

    // realtime
    useEffect(() => {
        const fieldId = user?.fieldId || 'random';
        onSnapshot(doc(db, 'users', fieldId), (doc) => {
            fieldId !== 'random' &&
                dispatch(
                    setUser({ ...doc.data(), fieldId: doc.id } as UserType),
                );
        });
    }, []);

    useEffect(() => {
        conversations.length > 0 &&
            conversations.forEach((conversation) => {
                onSnapshot(
                    doc(db, 'conversations', conversation.fieldId || 'random'),
                    (doc) => {
                        const conversation = doc.data() as RoomType;

                        dispatch(
                            setSingleConversation({
                                conversationId: doc.id,
                                conversationData: conversation,
                            }),
                        );
                    },
                );
            });
    }, [conversations.length]);

    //

    useEffect(() => {
        const getFriendsList = async () => {
            if (user?.friends && user.friends.length > 0) {
                const q = query(
                    collection(db, 'users'),
                    where('uid', 'in', user.friends || []),
                );

                const querySnapshot = await getDocs(q);

                dispatch(
                    setFriends(
                        querySnapshot.docs.map(
                            (doc) =>
                                ({
                                    ...doc.data(),
                                    fieldId: doc.id,
                                } as UserType),
                        ),
                    ),
                );
            }
        };

        getFriendsList();
    }, [user?.fieldId]);

    //
    const theme = useAppSelector(selectTheme);

    return (
        <>
            <div className={`flex ${theme === 'dark' && 'dark'}`}>
                <Sidebar />

                <div className='flex-1 bg-gray-100 dark:bg-trueGray-800 dark:text-gray-400'>
                    {currentTab === 'chat' && <ChatTab />}
                    {currentTab === 'profile' && <ProfileTab />}
                    {currentTab === 'friend' && <FriendsTab />}
                    {currentTab === 'setting' && <SettingTab />}
                </div>

                <FormAddFriend />

                {isAlertOpen && <Alert />}
            </div>
        </>
    );
};

export default Chat;
