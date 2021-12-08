import React from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
    return (
        <div className='min-h-screen w-screen overflow-x-hidden flex flex-col'>
            <Home />
            {/* <SignIn /> */}
            {/* <SignUp /> */}
        </div>
    );
};

export default App;
