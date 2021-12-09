import React from 'react';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div className='min-h-screen w-screen overflow-x-hidden flex flex-col'>
            {/* <Home /> */}
            {/* <SignIn /> */}
            {/* <SignUp /> */}
            {/* <Chat /> */}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='chat' element={<Chat />} />
            </Routes>
        </div>
    );
};

export default App;
