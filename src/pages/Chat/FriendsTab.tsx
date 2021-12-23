import { Icon } from '@iconify/react';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    DocumentData,
    DocumentReference,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectConversations } from '../../features/conversation/conversationSlice';
import { setIsFormAddFriendOpen } from '../../features/formAddFriend/formAddFriendSlice';
import { setCurrentTab } from '../../features/tab/tabSlice';
import {
    selectFriends,
    selectUser,
    setCurrentFriend,
} from '../../features/user/userSlice';
import { conversationsCollectionRef, db } from '../../firebase';
import AvatarImg from '../../images/defaultAvatar.png';
import { IdentificationType, RoomType, UserType } from '../../types';

const FriendsTab = () => {
    return (
        <div className='px-[10px] lg:px-[40px] pt-[20px] pb-[40px] max-h-screen overflow-auto flex flex-col space-y-4'>
            <FriendRequest />
            {/* <Online /> */}
            <Search />
            <FriendsList />
        </div>
    );
};

const FriendRequest = () => {
    const user = useAppSelector(selectUser);
    const userRef = doc(db, 'users', user?.fieldId || 'random');
    const [friendRequests, setFriendRequests] = useState([] as UserType[]);

    useEffect(() => {
        const getFriendsList = async () => {
            if (user?.friendRequests && user.friendRequests.length > 0) {
                const q = query(
                    collection(db, 'users'),
                    where('uid', 'in', user.friendRequests || []),
                );
                const querySnapshot = await getDocs(q);
                setFriendRequests(
                    querySnapshot.docs.map(
                        (doc) =>
                            ({ ...doc.data(), fieldId: doc.id } as UserType),
                    ),
                );
            }
        };
        getFriendsList();
    }, [user]);

    const createChat = async (
        friendRef: DocumentReference<DocumentData>,
        senderId: string,
    ) => {
        const members = [user?.uid, senderId];

        const newConversation = await addDoc(conversationsCollectionRef, {
            members,
            messages: [],
            lastSent: new Date().toString(),
        } as RoomType);

        await updateDoc(friendRef, {
            conversationIds: arrayUnion(newConversation.id),
        });

        await updateDoc(userRef, {
            conversationIds: arrayUnion(newConversation.id),
        });
    };

    const handleAgree = async ({
        uid: senderId,
        fieldId: senderFieldId,
    }: IdentificationType) => {
        const friendRef = doc(db, 'users', senderFieldId);

        /** current user (receiver: userRef: who receives friend request)
         * - add friend
         * - delete friend request
         */
        await updateDoc(userRef, {
            friends: arrayUnion(senderId),
        });

        await updateDoc(userRef, {
            friendRequests: arrayRemove(senderId),
        });

        /** friend (sender: friendRef: who sends request)
         * - add friend
         * - delete request
         */

        await updateDoc(friendRef, {
            friends: arrayUnion(user?.uid),
        });

        await updateDoc(friendRef, {
            requests: arrayRemove(user?.uid),
        });

        createChat(friendRef, senderId);

        const newFriendRequests = [...friendRequests];

        setFriendRequests(
            newFriendRequests.filter((user) => user.uid !== senderId),
        );
    };

    const handleDisagree = async ({
        uid: senderId,
        fieldId: senderFieldId,
    }: IdentificationType) => {
        const friendRef = doc(db, 'users', senderFieldId);

        // receiver:
        // - delete friend request

        await updateDoc(userRef, {
            friendRequests: arrayRemove(senderId),
        });

        const newFriendRequests = [...friendRequests];
        setFriendRequests(
            newFriendRequests.filter((user) => user.uid !== senderId),
        );

        // sender
        // - delete request
        await updateDoc(friendRef, {
            requests: arrayRemove(user?.uid),
        });
    };

    return (
        <div>
            <p className='font-semibold text-[23px]'>Lời mời kết bạn</p>

            {friendRequests &&
                friendRequests.length > 0 &&
                friendRequests.map(
                    ({ uid, displayName, photoURL, fieldId }) => (
                        <div
                            key={uid}
                            className='bg-white rounded-[10px] ml-[15px] mt-[10px] px-[20px] py-[10px] space-y-2 sm:flex items-center justify-between space-x-2'>
                            <div className='flex items-center space-x-2'>
                                <img
                                    className='h-[60px] w-[60px] rounded-full border'
                                    src={photoURL || AvatarImg}
                                    alt='Home'
                                />

                                <div>
                                    <p className='font-bold text-[18px]'>
                                        {displayName}
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-center space-x-4'>
                                <button
                                    className='btn w-[80px] sm:w-[120px] py-[7px]'
                                    onClick={() =>
                                        handleAgree({ uid, fieldId })
                                    }>
                                    Đồng ý
                                </button>
                                <button
                                    className='btn-outlined w-[80px] sm:w-[120px] py-[7px]'
                                    onClick={() =>
                                        handleDisagree({ uid, fieldId })
                                    }>
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ),
                )}
        </div>
    );
};

const Online = () => {
    return (
        <div>
            <p className='font-semibold text-[23px]'>Đang hoạt động</p>

            <div className='flex items-center space-x-4 ml-[15px] mt-[10px]'>
                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={AvatarImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>

                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={AvatarImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>

                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={AvatarImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>

                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={AvatarImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>
            </div>
        </div>
    );
};

const Search = () => {
    const dispatch = useAppDispatch();
    return (
        <div className='flex items-center justify-center space-x-3'>
            <div className='relative'>
                <Icon
                    className='absolute left-[10px] top-[50%] transform translate-y-[-50%] text-gray-400'
                    fontSize={30}
                    icon='carbon:search'
                />
                <input
                    className='input-text pl-[45px] bg-gray-300 font-semibold text-[18px]'
                    type='text'
                    placeholder='Tìm kiếm bạn'
                />
            </div>

            <Icon
                className='text-gray-500 cursor-pointer transform hover:scale-[1.2] hover:text-teal-500'
                icon='whh:addfriend'
                fontSize={30}
                onClick={() => {
                    dispatch(setIsFormAddFriendOpen(true));
                }}
            />
        </div>
    );
};

const FriendsList = () => {
    const friends = useAppSelector(selectFriends);

    const dispatch = useAppDispatch();

    return (
        <div>
            <p className='font-semibold text-[23px]'>Danh sách bạn bè</p>

            <div className='grid gap-x-[50px] gap-y-[20px] ml-[15px] mt-[10px] lg:grid-cols-2 lg:px-[30px]'>
                {friends &&
                    friends.length > 0 &&
                    friends.map((friend) => {
                        const { uid, displayName, photoURL } = friend;

                        return (
                            <div
                                key={uid}
                                className='flex items-center justify-between cursor-pointer hover:shadow'
                                onClick={() => {
                                    dispatch(setCurrentTab('chat'));
                                    dispatch(setCurrentFriend(friend));

                                    sessionStorage.setItem(
                                        'currentTab',
                                        'chat',
                                    );
                                }}>
                                <div className='flex items-center space-x-4'>
                                    <img
                                        className='h-[60px] w-[60px] sm:h-[75px] sm:w-[75px] rounded-[10px] border'
                                        src={photoURL || AvatarImg}
                                        alt='Home'
                                    />
                                    <p className='font-semibold text-[18px] sm:text-[22px]'>
                                        {displayName}
                                    </p>
                                </div>

                                <Icon
                                    className='text-[30px] sm:text-[35px] rounded-full cursor-pointer hover:bg-gray-300'
                                    icon='akar-icons:more-horizontal'
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default FriendsTab;
