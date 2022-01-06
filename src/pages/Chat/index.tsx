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
import {
    selectLanguage,
    selectTheme,
} from '../../features/setting/settingSlice';
import { selectUser, setFriends, setUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import { RoomType, UserType } from '../../types';
import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';
import 'moment/locale/vi';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

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
    }, [user?.fieldId]);

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

    const isVietnames = useAppSelector(selectLanguage) === 'vn';
    useEffect(() => {
        moment.locale(isVietnames ? 'vi' : 'en');
    }, [isVietnames]);

    //
    const theme = useAppSelector(selectTheme);

    return (
        <>
            <Helmet async>
                <title>Chat chit</title>
                <meta name='title' content='Chat chit' />
                <meta
                    name='description'
                    content='Trò chuyện với bạn bè, người thân của bạn. Chat chit miễn phí và mãi mãi là như thế.'
                />

                <link rel='canonical' href='https://chatchit.vercel.app' />
                {/* social */}

                <meta property='og:type' content='website' />
                <meta
                    property='og:url'
                    content='https://chatchit.vercel.app/chat'
                />
                <meta property='og:title' content='Chat chit' />
                <meta
                    property='og:description'
                    content='Trò chuyện với bạn bè, người thân của bạn. Chat chit miễn phí và mãi mãi là như thế.'
                />
                <meta
                    property='og:image'
                    content='https://chatchit.vercel.app/chat.png'
                />

                {/* Twitter */}

                <meta property='twitter:card' content='summary_large_image' />
                <meta
                    property='twitter:url'
                    content='https://chatchit.vercel.app/chat'
                />
                <meta property='twitter:title' content='Chat chit' />
                <meta
                    property='twitter:description'
                    content='Trò chuyện với bạn bè, người thân của bạn. Chat chit miễn phí và mãi mãi là như thế.'
                />
                <meta
                    property='twitter:image'
                    content='https://chatchit.vercel.app/chat.png'
                />
            </Helmet>

            <div
                className={`fixed top-0 bottom-0 left-0 right-0 flex ${
                    theme === 'dark' && 'dark'
                }`}>
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
