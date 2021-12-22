import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Info from './Info';
import MainChat from './MainChat';
import RecentMessages from './RecentMessages';

interface RecentMessagesProps {
    isRecentMessagesOpen: boolean;
    setIsRecentMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatTab = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isRecentMessagesOpen, setIsRecentMessagesOpen] = useState(false);

    useEffect(
        () =>
            window.addEventListener('resize', () => {
                if (window.outerWidth >= 768) setIsRecentMessagesOpen(false);
                if (window.outerWidth >= 1024) setIsInfoOpen(false);
            }),
        [],
    );

    return (
        <div className='min-h-screen flex'>
            <>
                <RecentMessages
                    isRecentMessagesOpen={isRecentMessagesOpen}
                    setIsRecentMessagesOpen={setIsRecentMessagesOpen}
                />
                <MainChat
                    setIsInfoOpen={setIsInfoOpen}
                    setIsRecentMessagesOpen={setIsRecentMessagesOpen}
                />
                <Info isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
            </>
        </div>
    );
};

export default ChatTab;
