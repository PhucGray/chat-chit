import AvatarImg from '../../images/defaultAvatar.png';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';
import { useEffect, useState } from 'react';
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { IdentificationType, UserType } from '../../types';
import { setIsFormAddFriendOpen } from '../../features/formAddFriend/formAddFriendSlice';

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

    const handleAgree = async ({ uid, fieldId }: IdentificationType) => {
        const friendRef = doc(db, 'users', fieldId);

        /** current user (receiver: userRef: who receives friend request)
         * - add friend
         * - delete friend request
         */
        await updateDoc(userRef, {
            friends: arrayUnion(uid),
        });

        await updateDoc(userRef, {
            friendRequests: arrayRemove(uid),
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

        const newFriendRequests = [...friendRequests];

        setFriendRequests(newFriendRequests.filter((user) => user.uid !== uid));
    };
    // disagree
    const handleDisagree = async ({ uid, fieldId }: IdentificationType) => {
        const friendRef = doc(db, 'users', fieldId);

        // receiver:
        // - delete friend request

        await updateDoc(userRef, {
            friendRequests: arrayRemove(uid),
        });

        const newFriendRequests = [...friendRequests];
        setFriendRequests(newFriendRequests.filter((user) => user.uid !== uid));

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
    const user = useAppSelector(selectUser);
    const [friends, setFriends] = useState([] as UserType[]);

    useEffect(() => {
        const getFriendsList = async () => {
            if (user?.friends && user.friends.length > 0) {
                const q = query(
                    collection(db, 'users'),
                    where('uid', 'in', user.friends || []),
                );
                const querySnapshot = await getDocs(q);

                setFriends(
                    querySnapshot.docs.map((doc) => doc.data() as UserType),
                );
            }
        };

        getFriendsList();
    }, [user]);

    return (
        <div>
            <p className='font-semibold text-[23px]'>Danh sách bạn bè</p>

            <div className='grid gap-x-[50px] gap-y-[20px] ml-[15px] mt-[10px] lg:grid-cols-2 lg:px-[30px]'>
                {friends &&
                    friends.length > 0 &&
                    friends.map(({ uid, displayName, photoURL }) => (
                        <div
                            key={uid}
                            className='flex items-center justify-between'>
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
                    ))}
            </div>
        </div>
    );
};

export default FriendsTab;
