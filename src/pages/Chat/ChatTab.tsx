import { Icon } from '@iconify/react';
import {
    Dispatch,
    FC,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import HomeImg from '../../images/home.png';
import Picker from 'emoji-picker-react';

interface MainChatProps {
    setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
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

    useEffect(
        () =>
            window.addEventListener('resize', () => {
                if (window.outerWidth < 1024) setIsInfoOpen(false);
            }),
        [],
    );

    return (
        <div className='min-h-screen flex lg:px-[60px]'>
            <MainChat setIsInfoOpen={setIsInfoOpen} />
            <Info isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
        </div>
    );
};

const MainChat: FC<MainChatProps> = ({ setIsInfoOpen }) => {
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
    ] as MessageType[]);

    const [currentMessage, setCurrentMessage] = useState('');
    const msgRef = useRef() as MutableRefObject<HTMLDivElement>;
    const msgsRef = useRef() as MutableRefObject<HTMLDivElement>;

    const handleSendMessage = () => {
        setMessages([...messages, { msg: currentMessage, from: 'me' }]);
        msgRef.current.innerText = '';
    };

    useEffect(() => {
        msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, [messages]);

    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleEmojiClick = (event: any, { emoji }: any) => {
        msgRef.current.innerText += emoji;
        setCurrentMessage((prev) => (prev += emoji));
    };

    return (
        <div className='h-screen flex-1 flex flex-col justify-between pt-[10px] space-y-2 relative'>
            <div className='flex items-center justify-between px-[20px]'>
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
                    className='cursor-pointer hover:text-teal-500 lg:hidden'
                    icon='entypo:info-with-circle'
                    fontSize={25}
                    onClick={(e) => {
                        e.stopPropagation();

                        setIsInfoOpen(true);
                    }}
                />
            </div>

            <div
                ref={msgsRef}
                className='flex-1 overflow-y-scroll bg-white space-y-3 p-[20px] rounded-[10px]'>
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
                    ref={msgRef}
                    className='flex-1 min-h-full max-h-[50vh] overflow-auto px-[10px] py-[5px] rounded-[5px] break-all border focus:border-teal-500 focus:outline-none'
                    contentEditable
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (!currentMessage.trim()) return;

                            setCurrentMessage('');
                            handleSendMessage();
                        } else setCurrentMessage(msgRef.current.innerText);
                    }}></div>

                <div className='relative'>
                    {isPickerOpen && (
                        <div
                            className='exit-zone'
                            onClick={() => setIsPickerOpen(false)}></div>
                    )}

                    {isPickerOpen && (
                        <Picker
                            pickerStyle={{
                                position: 'absolute',
                                bottom: '100%',
                                right: '100%',
                            }}
                            onEmojiClick={handleEmojiClick}
                        />
                    )}

                    <Icon
                        onClick={() => setIsPickerOpen(true)}
                        className='cursor-pointer hover:text-teal-500'
                        icon='akar-icons:face-very-happy'
                        fontSize={30}
                    />
                </div>

                <button
                    className='btn px-[30px] py-[10px] flex items-center space-x-3 text-[18px]'
                    onClick={handleSendMessage}>
                    <span>Gửi</span> <Icon icon='fluent:send-28-filled' />
                </button>
            </div>
        </div>
    );
};

const Info: FC<InfoProps> = ({ isInfoOpen, setIsInfoOpen }) => {
    return (
        <>
            {isInfoOpen && (
                <div
                    className='exit-zone bg-black opacity-60'
                    onClick={() => setIsInfoOpen(false)}></div>
            )}
            <div
                className={`${
                    isInfoOpen ? 'flex' : 'hidden'
                } lg:transform-none w-[300px] h-full pt-[40px] text-center shadow-lg fixed right-0 top-0 bg-white space-y-1 lg:flex flex-col items-center lg:static lg:shadow-none lg:bg-transparent`}
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
