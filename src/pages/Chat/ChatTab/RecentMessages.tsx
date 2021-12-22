import { Icon } from '@iconify/react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setIsFormAddFriendOpen } from '../../../features/formAddFriend/formAddFriendSlice';

interface RecentMessagesProps {
    isRecentMessagesOpen: boolean;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

const RecentMessages: FC<RecentMessagesProps> = ({
    isRecentMessagesOpen,
    setIsRecentMessagesOpen,
}) => {
    const rencentMessages = [
        {
            name: 'CR7',
            msg: 'Hôm nay bạn thế nào ajkfba a f w n a w f o a aofw aj k w',
            from: 'friend',
        },
        {
            name: 'Stephen',
            msg: 'Mới trúng vé số được 100 ngàn',
            from: 'me',
        },
        {
            name: 'Nadal',
            msg: 'Hút cần không pro ????',
            from: 'friend',
        },
        {
            name: 'Nadal',
            msg: 'Hút cần không pro ????',
            from: 'friend',
        },
        {
            name: 'Nadal',
            msg: 'Hút cần không pro ????',
            from: 'me',
        },
        {
            name: 'Nadal',
            msg: 'Hút cần không pro ????',
            from: 'friend',
        },
        {
            name: 'Nadal',
            msg: 'Hút cần không pro ????',
            from: 'me',
        },
        {
            name: 'Nadal',
            msg: 'Hút cần không pro ????',
            from: 'me',
        },
    ];

    const dispatch = useAppDispatch();
    return (
        <>
            <div
                className={`exit-zone ${
                    isRecentMessagesOpen ? 'block' : 'hidden'
                }  bg-black opacity-60 z-10 md:hidden`}
                onClick={() => setIsRecentMessagesOpen(false)}></div>

            <div
                className={`${
                    isRecentMessagesOpen ? 'flex' : 'hidden'
                } w-[270px] h-full max-h-screen py-[20px] z-10 fixed left-0 top-0 border-r bg-white 
                md:flex flex-col md:static md:bg-transparent`}>
                <div className='flex items-center space-x-2 px-[15px]'>
                    <Icon
                        className='text-gray-500 cursor-pointer transform hover:scale-[1.2] hover:text-teal-500'
                        icon='whh:addfriend'
                        fontSize={30}
                        onClick={() => {
                            dispatch(setIsFormAddFriendOpen(true));
                        }}
                    />
                    <p>Tìm kiếm bạn bè</p>
                </div>

                <hr className='my-[20px]' />

                <p className='font-semibold mb-[15px] px-[15px]'>
                    Tin nhắn gần đây
                </p>

                <div className='flex-1 overflow-auto'>
                    {rencentMessages &&
                        rencentMessages.map(({ name, msg, from }, index) => (
                            <div
                                key={index}
                                className='w-full overflow-hidden px-[10px] py-[10px] bg-white border-b-[1px] cursor-pointer hover:bg-teal-50'>
                                <p className='font-semibold'>{name}</p>

                                <p className='text-sm text-gray-400 truncate'>
                                    {from === 'me' && 'Bạn:'} {msg}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default RecentMessages;
