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
import HomeImg from '../../../images/home.png';
import Picker from 'emoji-picker-react';

interface MainChatProps {
    setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

type MessageType = {
    msg: string;
    from: 'me' | 'friend';
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
export default MainChat;
