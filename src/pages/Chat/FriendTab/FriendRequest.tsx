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
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/user/userSlice';
import { conversationsCollectionRef, db } from '../../../firebase';
import { IdentificationType, RoomType, UserType } from '../../../types';
import AvatarImg from '../../../images/defaultAvatar.png';

interface Props {
    isVietnames: boolean;
}

const FriendRequest = ({ isVietnames }: Props) => {
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
            {friendRequests && friendRequests.length > 0 && (
                <p className='font-semibold text-[23px]'>
                    {isVietnames ? 'Lời mời kết bạn' : 'Friend requests'}
                </p>
            )}

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
                                    {isVietnames ? 'Đồng ý' : 'Accept'}
                                </button>
                                <button
                                    className='btn-outlined w-[80px] sm:w-[120px] py-[7px]'
                                    onClick={() =>
                                        handleDisagree({ uid, fieldId })
                                    }>
                                    {isVietnames ? 'Xoá' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ),
                )}
        </div>
    );
};

export default FriendRequest;
