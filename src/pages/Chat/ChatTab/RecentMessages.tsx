import { Icon } from '@iconify/react';
import moment from 'moment';
import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectConversations } from '../../../features/conversation/conversationSlice';
import { setIsFormAddFriendOpen } from '../../../features/formAddFriend/formAddFriendSlice';
import { selectLanguage } from '../../../features/setting/settingSlice';
import {
    selectCurrentFriend,
    selectFriends,
    selectUser,
    setCurrentFriend,
} from '../../../features/user/userSlice';

interface RecentMessagesProps {
    isRecentMessagesOpen: boolean;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

const RecentMessages: FC<RecentMessagesProps> = ({
    isRecentMessagesOpen,
    setIsRecentMessagesOpen,
}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const friends = useAppSelector(selectFriends);
    const currentFriend = useAppSelector(selectCurrentFriend);
    const conversations = useAppSelector(selectConversations);

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <>
            <div
                className={`exit-zone ${
                    isRecentMessagesOpen ? 'block' : 'hidden'
                }  bg-black opacity-60 z-10 md:hidden`}
                onClick={() => setIsRecentMessagesOpen(false)}></div>
            <div
                className={`${
                    isRecentMessagesOpen || !currentFriend
                        ? 'flex w-full'
                        : 'hidden'
                } ${
                    currentFriend && 'w-[270px]'
                } h-screen py-[20px] z-10 fixed left-0 top-0 border-r bg-white 
                md:flex flex-col md:static md:bg-transparent md:w-[270px]
                dark:border-trueGray-500 dark:bg-trueGray-800`}>
                <div className='flex items-center space-x-2 px-[15px]'>
                    <Icon
                        className='text-gray-500 cursor-pointer transform 
                        hover:scale-[1.2] hover:text-teal-500
                        dark:text-trueGray-300'
                        icon='whh:addfriend'
                        fontSize={30}
                        onClick={() => {
                            dispatch(setIsFormAddFriendOpen(true));
                        }}
                    />
                    <p>{isVietnames ? 'Tìm kiếm bạn bè' : 'Search friends'}</p>
                </div>

                <hr className='my-[20px] dark:border-trueGray-500' />

                <p className='font-semibold mb-[15px] px-[15px]'>
                    {isVietnames ? 'Tin nhắn gần đây' : 'Recent messages'}
                </p>

                <div className='flex-1 overflow-auto'>
                    {conversations && friends ? (
                        conversations.map(({ fieldId, messages, members }) => {
                            if (messages && messages.length > 0) {
                                const { uid, sentAt, msg } =
                                    messages[messages.length - 1];

                                const isCurrentUser = user?.uid === uid;

                                const friendId = members.filter(
                                    (id) => id !== user?.uid,
                                )[0];

                                const friend = friends.filter(
                                    (friend) => friend.uid === friendId,
                                )[0];

                                let content = '';

                                if (msg.type === 'text') content = msg.content;

                                if (msg.type === 'image')
                                    content = `--${
                                        isVietnames ? 'Ảnh' : 'Picture'
                                    }--`;
                                return (
                                    <div
                                        key={fieldId}
                                        onClick={() => {
                                            dispatch(setCurrentFriend(friend));
                                        }}>
                                        <div
                                            className='w-full overflow-hidden px-[10px] py-[10px] 
                                        bg-white border-b-[1px] cursor-pointer hover:bg-teal-50
                                        dark:bg-trueGray-600 dark:text-gray-100 dark:hover:bg-trueGray-500 dark:border-trueGray-500'>
                                            <p className='font-semibold text-[18px]'>
                                                {friend?.displayName}
                                            </p>

                                            <p className='text-sm text-gray-400 truncate'>
                                                {isCurrentUser && 'Bạn: '}
                                                {content}
                                            </p>

                                            <p>
                                                {moment(sentAt)
                                                    .startOf('day')
                                                    .fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }

                            return <></>;
                        })
                    ) : (
                        <div className='text-center'>
                            {isVietnames
                                ? 'Đang tải dữ liệu...'
                                : 'Loading data...'}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecentMessages;
