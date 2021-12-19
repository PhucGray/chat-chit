import { Icon } from '@iconify/react';
import {
    arrayUnion,
    collection,
    doc,
    FieldValue,
    getDocs,
    increment,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    selectIsFormAddFriendOpen,
    setIsOpen,
} from '../features/formAddFriend/formAddFriendSlice';
import { selectUser } from '../features/user/userSlice';
import { db } from '../firebase';
import AvatarImg from '../images/defaultAvatar.png';
import { IdentificationType, SubmitFormType, UserType } from '../types';

const FormAddFriend = () => {
    const isOpen = useAppSelector(selectIsFormAddFriendOpen);
    const dispatch = useAppDispatch();
    const closeForm = () => dispatch(setIsOpen(false));

    const [value, setValue] = useState('');
    const [matchedFriends, setMatchedFriends] = useState([] as UserType[]);

    const handleSearch = async (e: SubmitFormType) => {
        e.preventDefault();

        if (value.trim()) {
            const q = query(
                collection(db, 'users'),
                where('displayName', '==', value),
            );

            const querySnapshot = await getDocs(q);

            setMatchedFriends(
                querySnapshot.docs.map(
                    (doc) =>
                        ({
                            ...doc.data(),
                            fieldId: doc.id,
                        } as UserType),
                ),
            );
        }
    };

    const user = useAppSelector(selectUser);

    const handleAdd = async ({ fieldId, uid }: IdentificationType) => {
        const userRef = doc(db, 'users', user?.fieldId || 'random');
        const friendRef = doc(db, 'users', fieldId);

        await updateDoc(friendRef, {
            friendRequests: arrayUnion(user?.uid),
        });

        await updateDoc(userRef, {
            requests: arrayUnion(uid),
        });
    };
    return (
        <>
            {isOpen && (
                <>
                    <div
                        className='exit-zone bg-black opacity-50 z-20'
                        onClick={closeForm}
                    />

                    <div className='z-20 fixed-center translate-y-[-50%] bg-white w-screen max-w-[500px] rounded-[10px] p-[20px] space-y-3'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[20px] font-bold'>Thêm bạn bè</p>

                            <Icon
                                className='icon text-[30px]'
                                icon='eva:close-fill'
                                onClick={closeForm}
                            />
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className='h-[45px] flex justify-center justify-items-stretch space-x-2'>
                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className='input-text'
                                type='text'
                                placeholder='Nhập tên người dùng'
                            />
                            <button
                                className='btn px-[20px] flex items-center sm:space-x-2'
                                type='submit'>
                                <Icon fontSize={25} icon='carbon:search' />
                                <p className='hidden sm:block'>Tìm kiếm</p>
                            </button>
                        </form>

                        <hr />

                        {matchedFriends && matchedFriends.length > 0 ? (
                            matchedFriends.map(
                                ({ uid, displayName, photoURL, fieldId }) => {
                                    const isRequested =
                                        user && user.requests?.includes(uid);

                                    const isFriend =
                                        user && user.friends?.includes(uid);

                                    return (
                                        <div
                                            key={uid}
                                            className='ml-[15px] mt-[10px] py-[10px] flex items-center justify-between space-x-2'>
                                            <div className='flex items-center space-x-2'>
                                                <img
                                                    className='h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] rounded-full border'
                                                    src={photoURL || AvatarImg}
                                                    alt='Home'
                                                />

                                                <p className='text-[16px] sm:text-[18px] max-w-[250px] truncate'>
                                                    {displayName}
                                                </p>
                                            </div>

                                            {isFriend || (
                                                <button
                                                    className={`
                                                ${
                                                    isRequested
                                                        ? 'btn-outlined'
                                                        : 'btn'
                                                } w-[80px] sm:w-[120px] py-[7px]
                                                `}
                                                    type='button'
                                                    onClick={() =>
                                                        handleAdd({
                                                            uid,
                                                            fieldId,
                                                        })
                                                    }>
                                                    {isRequested
                                                        ? 'Đã gửi lời mời'
                                                        : 'Kết bạn'}
                                                </button>
                                            )}
                                        </div>
                                    );
                                },
                            )
                        ) : (
                            <p className='text-center font-semibold'>
                                Không tồn tại người dùng
                            </p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default FormAddFriend;
