import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentTab } from '../../../features/tab/tabSlice';
import {
    selectFriends,
    setCurrentFriend,
} from '../../../features/user/userSlice';
import AvatarImg from '../../../images/defaultAvatar.png';

interface Props {
    isVietnames: boolean;
}

const FriendsList = ({ isVietnames }: Props) => {
    const friends = useAppSelector(selectFriends);
    const dispatch = useAppDispatch();

    return (
        <>
            <p className='font-semibold text-[23px]'>
                {isVietnames ? 'Danh sách bạn bè' : 'Friend list'}
            </p>

            <div className='overflow-auto grid gap-x-[50px] gap-y-[20px] ml-[15px] mt-[10px] lg:grid-cols-2 lg:px-[30px]'>
                {friends &&
                    friends.length > 0 &&
                    friends.map((friend) => {
                        const { uid, displayName, photoURL } = friend;

                        return (
                            <div
                                key={uid}
                                className='flex items-center justify-between 
                                px-[20px] py-[10px] rounded-[10px] cursor-pointer hover:shadow
                                bg-white
                                dark:bg-trueGray-600 dark:hover:bg-trueGray-700'
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
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default FriendsList;
