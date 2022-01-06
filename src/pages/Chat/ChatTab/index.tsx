import { documentId, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setConversations } from '../../../features/conversation/conversationSlice';
import {
    selectCurrentFriend,
    selectUser,
} from '../../../features/user/userSlice';
import { conversationsCollectionRef } from '../../../firebase';
import { RoomType } from '../../../types';
import Info from './Info';
import MainChat from './MainChat';
import RecentMessages from './RecentMessages';

const ChatTab = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isRecentMessagesOpen, setIsRecentMessagesOpen] = useState(false);

    useEffect(
        () =>
            window.addEventListener('resize', () => {
                if (window.outerWidth >= 768) setIsRecentMessagesOpen(false);
                if (window.outerWidth >= 1024) setIsInfoOpen(false);
            }),
        [],
    );

    //
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const getConversations = async () => {
        if (user?.conversationIds && user.conversationIds.length > 0) {
            const q = query(
                conversationsCollectionRef,
                where(documentId(), 'in', user.conversationIds),
            );

            const querySnapshot = await getDocs(q);

            const conversations = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), fieldId: doc.id } as RoomType;
            });

            dispatch(setConversations(conversations));
        }
    };

    const currentFriend = useAppSelector(selectCurrentFriend);

    useEffect(() => {
        if (user?.fieldId && !currentFriend?.uid) {
            getConversations();
        }
    }, [user?.fieldId]);

    return (
        <div className='h-full flex justify-between overflow-auto  '>
            <>
                <RecentMessages
                    isRecentMessagesOpen={isRecentMessagesOpen}
                    setIsRecentMessagesOpen={setIsRecentMessagesOpen}
                />
                <MainChat
                    setIsInfoOpen={setIsInfoOpen}
                    setIsRecentMessagesOpen={setIsRecentMessagesOpen}
                />
                <Info isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
            </>
        </div>
    );
};

export default ChatTab;
