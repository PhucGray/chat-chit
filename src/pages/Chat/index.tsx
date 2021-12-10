import ChatTab from './ChatTab';
import FriendsTab from './FriendsTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';

const Chat = () => {
    return (
        <div className='flex bg-gray-100'>
            <Sidebar />

            <div className='flex-1'>
                {/* <ChatTab /> */}
                {/* <SettingTab /> */}
                {/* <FriendsTab /> */}
                <ProfileTab />
            </div>
        </div>
    );
};

export default Chat;
