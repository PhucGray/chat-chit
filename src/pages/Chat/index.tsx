
import ChatTab from './Chat-Tab';
import SettingTab from './SettingTab';
import Sidebar from './Sidebar';

const Chat = () => {
    return (
        <div className='flex bg-gray-100'>
            <Sidebar />

            <div className='flex-1'>
                {/* <ChatTab /> */}
                <SettingTab />
            </div>
        </div>
    );
};

export default Chat;
