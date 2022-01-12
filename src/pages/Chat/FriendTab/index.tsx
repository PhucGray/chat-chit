import { useAppSelector } from '../../../app/hooks';
import { selectLanguage } from '../../../features/setting/settingSlice';
import FriendRequest from './FriendRequest';
import FriendsList from './FriendsList';
import Search from './Search';

const FriendsTab = () => {
    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <div className='px-[10px] lg:px-[40px] h-screen overflow-auto flex flex-col space-y-4'>
            <FriendRequest isVietnames={isVietnames} />
            <Search isVietnames={isVietnames} />
            <FriendsList isVietnames={isVietnames} />
        </div>
    );
};

export default FriendsTab;
