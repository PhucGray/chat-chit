import { Icon } from '@iconify/react';
import Picker from 'emoji-picker-react';
import {
    Dispatch,
    FC,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useAppSelector } from '../../app/hooks';
import Loading from '../../components/Loading';
import { selectUser } from '../../features/user/userSlice';
import HomeImg from '../../images/home.png';

interface RecentMessagesProps {
    isRecentMessagesOpen: boolean;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

interface MainChatProps {
    setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

interface InfoProps {
    isInfoOpen: boolean;
    setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
}

type MessageType = {
    msg: string;
    from: 'me' | 'friend';
};

const ChatTab = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isRecentMessagesOpen, setIsRecentMessagesOpen] = useState(false);

    useEffect(
        () =>
            window.addEventListener('resize', () => {
                if (window.outerWidth < 1024) setIsInfoOpen(false);
            }),
        [],
    );

    const user = useAppSelector(selectUser);
    return (
        <div className='min-h-screen flex'>
            {user?.uid ? (
                <>
                    <RecentMessages
                        isRecentMessagesOpen={isRecentMessagesOpen}
                        setIsRecentMessagesOpen={setIsRecentMessagesOpen}
                    />
                    <MainChat
                        setIsInfoOpen={setIsInfoOpen}
                        setIsRecentMessagesOpen={setIsRecentMessagesOpen}
                    />
                    <Info
                        isInfoOpen={isInfoOpen}
                        setIsInfoOpen={setIsInfoOpen}
                    />
                </>
            ) : (
                <Loading msg='Đang đăng nhập' />
            )}
        </div>
    );
};

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
    return (
        <>
            <div
                className={`exit-zone ${
                    isRecentMessagesOpen ? 'block' : 'hidden'
                } bg-black opacity-60 z-10`}
                onClick={() => setIsRecentMessagesOpen(false)}></div>

            <div
                className={`${
                    isRecentMessagesOpen ? 'flex' : 'hidden'
                } w-[270px] h-full max-h-screen py-[20px] z-10 fixed left-0 top-0 border-r bg-white lg:flex flex-col lg:static lg:bg-transparent`}>
                <div className='flex items-center space-x-2 px-[15px]'>
                    <Icon
                        className='text-gray-500 cursor-pointer transform hover:scale-[1.2] hover:text-teal-500'
                        icon='whh:addfriend'
                        fontSize={30}
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

const MainChat: FC<MainChatProps> = ({
    setIsInfoOpen,
    setIsRecentMessagesOpen,
}) => {
    const [messages, setMessages] = useState([
        {
            msg: 'Chào bạn, bạn khoẻ không ?',
            from: 'me',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'friend',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'friend',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'friend',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'friend',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'friend',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'me',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'me',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'me',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'me',
        },
        {
            msg: 'Tôi khoẻ, còn bạn ?',
            from: 'me',
        },
    ] as MessageType[]);

    const [currentMessage, setCurrentMessage] = useState('');
    const inputRef = useRef() as MutableRefObject<HTMLDivElement>;
    const conversationRef = useRef() as MutableRefObject<HTMLDivElement>;

    const handleSendMessage = () => {
        inputRef.current.innerText = '';
        setMessages([...messages, { msg: currentMessage, from: 'me' }]);
    };

    useEffect(() => {
        conversationRef.current.scrollTop =
            conversationRef.current.scrollHeight;
    }, [messages]);

    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleEmojiClick = (event: any, { emoji }: any) => {
        inputRef.current.innerText += emoji;
        setCurrentMessage((prev) => (prev += emoji));
    };

    return (
        <div className='h-screen flex-1 flex flex-col justify-between pt-[10px] space-y-2 relative'>
            <div className='flex items-center justify-between px-[20px]'>
                <Icon
                    className='icon lg:hidden'
                    icon='carbon:open-panel-left'
                    fontSize={25}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsRecentMessagesOpen(true);
                    }}
                />

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

                <Icon
                    className='icon xl:hidden'
                    icon='entypo:info-with-circle'
                    fontSize={25}
                    onClick={(e) => {
                        e.stopPropagation();

                        setIsInfoOpen(true);
                    }}
                />
            </div>

            <div
                ref={conversationRef}
                className='flex-1 overflow-y-auto bg-white space-y-3 p-[20px] rounded-[10px]'>
                {messages &&
                    messages.map(({ msg, from }, index) => (
                        <div
                            key={index}
                            className={`${
                                from === 'me' ? 'sent-msg' : 'received-msg'
                            }`}>
                            {msg}
                        </div>
                    ))}
            </div>

            <div className='min-h-[10%] bg-white p-[15px]  flex items-center justify-between rounded-[10px] space-x-4'>
                <div className='relative'>
                    {isPickerOpen && (
                        <>
                            <div
                                className='exit-zone opacity-60'
                                onClick={() => setIsPickerOpen(false)}
                            />

                            <Picker
                                pickerStyle={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    right: '100%',
                                }}
                                onEmojiClick={handleEmojiClick}
                            />
                        </>
                    )}

                    <Icon
                        onClick={() => setIsPickerOpen(true)}
                        className='icon'
                        icon='akar-icons:face-very-happy'
                        fontSize={30}
                    />
                </div>

                <div
                    ref={inputRef}
                    className='flex-1 min-h-full max-h-[50vh] overflow-auto px-[10px] py-[5px] rounded-[5px] break-all border focus:border-teal-500 focus:outline-none'
                    contentEditable
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') return e.preventDefault();
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (!currentMessage.trim()) return;
                            handleSendMessage();
                            setCurrentMessage('');
                        } else {
                            setCurrentMessage(inputRef.current.innerText);
                        }
                    }}></div>

                <span
                    onClick={handleSendMessage}
                    className='block sm:hidden text-[18px] cursor-pointer hover:text-teal-500'>
                    Gửi
                </span>

                <button
                    className='hidden btn px-[30px] py-[10px] sm:flex items-center space-x-3'
                    onClick={handleSendMessage}>
                    <span>Gửi</span>{' '}
                    <Icon icon='fluent:send-28-filled' fontSize={25} />
                </button>
            </div>
        </div>
    );
};

const Info: FC<InfoProps> = ({ isInfoOpen, setIsInfoOpen }) => {
    return (
        <>
            <div
                className={`exit-zone ${
                    isInfoOpen ? 'block' : 'hidden'
                } bg-black opacity-60`}
                onClick={() => setIsInfoOpen(false)}></div>

            <div
                className={`${
                    isInfoOpen ? 'flex' : 'hidden'
                }  w-[300px] h-full pt-[40px] text-center fixed right-0 top-0 bg-white shadow-lg space-y-1 xl:flex flex-col items-center xl:static xl:shadow-none xl:bg-transparent`}
                onClick={(e) => e.stopPropagation()}>
                <div className='relative w-max'>
                    <img
                        className='rounded-full h-[80px] w-[80px] border'
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
                    <img
                        className='h-[80px] w-[80px]'
                        src={HomeImg}
                        alt='Home'
                    />
                    <img
                        className='h-[80px] w-[80px]'
                        src={HomeImg}
                        alt='Home'
                    />
                    <img
                        className='h-[80px] w-[80px]'
                        src={HomeImg}
                        alt='Home'
                    />
                    <img
                        className='h-[80px] w-[80px]'
                        src={HomeImg}
                        alt='Home'
                    />
                    <img
                        className='h-[80px] w-[80px]'
                        src={HomeImg}
                        alt='Home'
                    />
                    <img
                        className='h-[80px] w-[80px]'
                        src={HomeImg}
                        alt='Home'
                    />
                </div>
            </div>
        </>
    );
};

export default ChatTab;
