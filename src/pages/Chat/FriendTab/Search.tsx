import { BsSearch } from 'react-icons/bs';
import { RiUserAddFill } from 'react-icons/ri';
import { useAppDispatch } from '../../../app/hooks';
import { setIsFormAddFriendOpen } from '../../../features/formAddFriend/formAddFriendSlice';

interface Props {
    isVietnames: boolean;
}
const Search = ({ isVietnames }: Props) => {
    const dispatch = useAppDispatch();
    return (
        <div className='flex items-center justify-center space-x-3'>
            <div className='relative'>
                <BsSearch
                    className='absolute left-[10px] top-[50%] transform translate-y-[-50%] text-gray-400'
                    fontSize={30}
                />
                <input
                    className='input-text pl-[45px] bg-gray-300 font-semibold text-[18px]
                    dark:text-trueGray-600 dark:bg-trueGray-300'
                    type='text'
                    placeholder={
                        isVietnames ? 'Tìm kiếm bạn' : 'Search friends'
                    }
                />
            </div>

            <RiUserAddFill
                className='text-gray-500 cursor-pointer transform hover:scale-[1.2] hover:text-teal-500'
                fontSize={30}
                onClick={() => {
                    dispatch(setIsFormAddFriendOpen(true));
                }}
            />
        </div>
    );
};

export default Search;
