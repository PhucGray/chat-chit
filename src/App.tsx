import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

const App = () => {
    const user = useAppSelector(selectUser);

    const isAuth = localStorage.getItem('auth') || user;

    return (
        <>
            {/* className='h-screen overflow-hidden w-full flex flex-col bg-red-50' */}
            {/* <Home /> */}
            {/* <SignIn /> */}
            {/* <SignUp /> */}
            {/* <Chat /> */}
            <Routes>
                <Route
                    path='/'
                    element={isAuth ? <Navigate to='/chat' /> : <Home />}
                />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route
                    path='chat'
                    element={isAuth ? <Chat /> : <Navigate to='/sign-in' />}
                />
            </Routes>
        </>
    );
};

export default App;
