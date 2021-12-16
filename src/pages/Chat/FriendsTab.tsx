import HomeImg from '../../images/home.png';
import { Icon } from '@iconify/react';

const FriendsTab = () => {
    return (
        <div className='px-[10px] lg:px-[40px] pt-[20px] pb-[40px] max-h-screen overflow-auto flex flex-col space-y-4'>
            <FriendRequest />
            <Online />
            <Search />
            <ListFriend />
        </div>
    );
};

const FriendRequest = () => {
    return (
        <div>
            <p className='font-semibold text-[23px]'>Lời mời kết bạn</p>

            <div className='bg-white rounded-[10px] ml-[15px] mt-[10px] px-[20px] py-[10px] space-y-2 sm:flex items-center justify-between space-x-2'>
                <div className='flex items-center space-x-2'>
                    <img
                        className='h-[60px] w-[60px] rounded-full border'
                        src={HomeImg}
                        alt='Home'
                    />

                    <div>
                        <p className='font-bold text-[18px]'>Ronaldo</p>
                        <div className='flex items-center space-x-1'>
                            <p className='text text-gray-400'>
                                Hi, I'm Ronaldo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center space-x-4'>
                    <button className='btn w-[80px] sm:w-[120px] py-[7px]'>
                        Đồng ý
                    </button>
                    <button className='btn-outlined w-[80px] sm:w-[120px] py-[7px]'>
                        Xoá
                    </button>
                </div>
            </div>
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
                        src={HomeImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>

                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={HomeImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>

                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={HomeImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>

                <div className='relative'>
                    <img
                        className='h-[55px] w-[55px] rounded-full border'
                        src={HomeImg}
                        alt='Home'
                    />

                    <div className='circle-primary absolute bottom-0 right-1'></div>
                </div>
            </div>
        </div>
    );
};

const Search = () => {
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
            />
        </div>
    );
};

const ListFriend = () => {
    const friends = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div>
            <p className='font-semibold text-[23px]'>Danh sách bạn bè</p>

            <div className='grid gap-x-[50px] gap-y-[20px] ml-[15px] mt-[10px] lg:grid-cols-2 lg:px-[30px]'>
                {friends &&
                    friends.map((friend) => (
                        <div
                            key={friend}
                            className='flex items-center justify-between'>
                            <div className='flex items-center space-x-4'>
                                <img
                                    className='h-[60px] w-[60px] sm:h-[75px] sm:w-[75px] rounded-[10px] border'
                                    src={HomeImg}
                                    alt='Home'
                                />
                                <p className='font-semibold text-[18px] sm:text-[22px]'>
                                    Friend {friend}
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
