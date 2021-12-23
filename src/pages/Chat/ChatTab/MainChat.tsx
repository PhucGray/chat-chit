import { Icon } from '@iconify/react';
import Picker from 'emoji-picker-react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {
    Dispatch,
    FC,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useAppSelector } from '../../../app/hooks';
import {
    selectCurrentFriend,
    selectUser,
} from '../../../features/user/userSlice';
import { db } from '../../../firebase';
import AvatarImg from '../../../images/defaultAvatar.png';
import { MessageType } from '../../../types';
import moment from 'moment';
import {
    selectConversations,
    selectCurrentConversation,
} from '../../../features/conversation/conversationSlice';

interface MainChatProps {
    setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

const MainChat: FC<MainChatProps> = ({
    setIsInfoOpen,
    setIsRecentMessagesOpen,
}) => {
    const user = useAppSelector(selectUser);
    const conversations = useAppSelector(selectConversations);
    const currentFriend = useAppSelector(selectCurrentFriend);
    // const currentConversation = useAppSelector(selectCurrentConversation);

    const inputRef = useRef() as MutableRefObject<HTMLDivElement>;
    const conversationRef = useRef() as MutableRefObject<HTMLDivElement>;

    const getCurrentConversation = (friendId: string) =>
        conversations &&
        conversations
            .filter(
                (conversation) =>
                    conversation.members.length === 2 &&
                    conversation.members.includes(friendId),
            )
            .map((conversation) => conversation)[0];

    const conversationDocumentRef = doc(
        db,
        'conversations',
        getCurrentConversation(currentFriend?.uid || 'test')?.fieldId ||
            'random',
    );

    const handleSendMessage = async () => {
        const content = inputRef.current.innerText;
        inputRef.current.innerText = '';

        const newMessage = {
            msg: {
                type: 'text',
                content,
            },
            sentAt: new Date().toString(),
            uid: user?.uid,
        } as MessageType;

        await updateDoc(conversationDocumentRef, {
            messages: arrayUnion(newMessage),
        });
    };

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop =
                conversationRef.current.scrollHeight;
        }
    }, []);

    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleEmojiClick = (event: any, { emoji }: any) =>
        (inputRef.current.innerText += emoji);

    return (
        <>
            {user && (
                <div className='h-screen flex-1 flex flex-col justify-between pt-[10px] space-y-2 relative'>
                    {currentFriend && (
                        <>
                            <div className='flex items-center justify-between px-[20px]'>
                                <Icon
                                    className='icon md:hidden'
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
                                        src={
                                            currentFriend.photoURL || AvatarImg
                                        }
                                        alt='Avartar'
                                    />

                                    <div>
                                        <p className='font-bold'>
                                            {currentFriend.displayName}
                                        </p>
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
                                {getCurrentConversation(currentFriend.uid) &&
                                    getCurrentConversation(
                                        currentFriend.uid,
                                    ).messages.map(
                                        ({ messageId, msg, sentAt, uid }) => {
                                            const isCurrentUser =
                                                user.uid === uid;

                                            return (
                                                <div
                                                    key={messageId}
                                                    className={` ${
                                                        isCurrentUser
                                                            ? 'ml-auto bg-gray-200'
                                                            : 'ml-0 border'
                                                    }
                                                            w-max max-w-[300px] rounded-[7px] py-[15px] px-[20px] 
                                                            break-all  relative group`}>
                                                    {msg.content}

                                                    <div
                                                        className={`
                                                        ${
                                                            isCurrentUser
                                                                ? 'right-[80%]'
                                                                : 'left-[80%]'
                                                        }
                                                        absolute  top-[-20%] w-max 
                                                               px-[10px] py-[5px] rounded-[10px]
                                                              bg-gray-500 text-white
                                                              hidden group-hover:block`}>
                                                        {moment(sentAt)
                                                            .startOf('hour')
                                                            .fromNow()}
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                            </div>

                            <div className='min-h-[10%] bg-white p-[15px]  flex items-center justify-between rounded-[10px] space-x-4'>
                                <div className='relative'>
                                    {isPickerOpen && (
                                        <>
                                            <div
                                                className='exit-zone opacity-60'
                                                onClick={() =>
                                                    setIsPickerOpen(false)
                                                }
                                            />

                                            <Picker
                                                pickerStyle={{
                                                    position: 'absolute',
                                                    bottom: '100%',
                                                    right: '100%',
                                                    zIndex: '100000',
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
                                        if (e.key === 'Enter')
                                            return e.preventDefault();
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSendMessage();
                                        } else {
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
                                    <Icon
                                        icon='fluent:send-28-filled'
                                        fontSize={25}
                                    />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};
export default MainChat;
