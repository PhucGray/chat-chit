import { Icon } from '@iconify/react';
import HomeImg from '../../images/home.png';

const ChatTab = () => {
    return (
        <div className='min-h-screen flex px-[60px]'>
            <MainChat />

            <Info />
        </div>
    );
};

const MainChat = () => {
    return (
        <div className='h-screen flex-1 flex flex-col justify-between pt-[10px] space-y-2 relative'>
            <div className='flex items-center space-x-2'>
                <img
                    className='rounded-full h-[53px] w-[53px]'
                    src={HomeImg}
                    alt='Home'
                />

                <div>
                    <p className='font-bold'>Adam Levince</p>
                    <div className='flex items-center space-x-1'>
                        <div className='circle-primary'></div>
                        <p className='text-sm italic text-gray-400'>
                            Đang hoạt động
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex-1 overflow-y-scroll bg-white space-y-3 p-[20px] rounded-[10px]'>
                <div className='sent-msg'>Chào bạn, bạn khoẻ không ?</div>

                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
                <div className='received-msg'>Tôi khoẻ, còn bạn ?</div>
            </div>

            <div className='min-h-[10%] bg-white p-[15px]  flex items-center justify-between rounded-[10px] space-x-4'>
                <div className='flex items-center'>
                    <Icon
                        className='cursor-pointer text-gray-500 text-[30px]'
                        icon='bi:plus-circle'
                    />

                    <Icon
                        className='text-gray-200 text-[40px]'
                        icon='fluent:divider-tall-16-regular'
                    />
                </div>

                <div
                    className='flex-1 min-h-full max-h-[50vh] overflow-auto px-[10px] break-all border focus:border-teal-500 focus:outline-none'
                    contentEditable></div>

                <button className='btn px-[30px] py-[10px] rounded-[7px] flex items-center space-x-3 text-[18px]'>
                    <span>Gửi</span> <Icon icon='fluent:send-28-filled' />
                </button>
            </div>
        </div>
    );
};

const Info = () => {
    return (
        <div className='w-[300px] pt-[40px] flex flex-col items-center space-y-1'>
            <div className='relative w-max'>
                <img
                    className='rounded-full h-[80px] w-[80px]'
                    src={HomeImg}
                    alt='Home'
                />
                <div className='circle-primary h-[13px] w-[13px] absolute right-[10px] bottom-0'></div>
            </div>

            <p className='font-bold text-[18px]'>Adam Levince</p>
            <p className='italic text-gray-400'>Đang hoạt động</p>

            <div className='h-px w-[80%] bg-gray-400'></div>

            <p className='font-bold text-[18px] w-[80%]'>Hình ảnh</p>

            <div className='w-[80%] grid grid-cols-3 gap-[5px]'>
                <img className='h-[80px] w-[80px]' src={HomeImg} alt='Home' />
                <img className='h-[80px] w-[80px]' src={HomeImg} alt='Home' />
                <img className='h-[80px] w-[80px]' src={HomeImg} alt='Home' />
                <img className='h-[80px] w-[80px]' src={HomeImg} alt='Home' />
                <img className='h-[80px] w-[80px]' src={HomeImg} alt='Home' />
                <img className='h-[80px] w-[80px]' src={HomeImg} alt='Home' />
            </div>
        </div>
    );
};

export default ChatTab;
