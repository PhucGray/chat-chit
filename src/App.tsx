import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Loading from './components/Loading';
import { selectLoading, setLoading } from './features/loading/loadingSlice';
import { setUser } from './features/user/userSlice';
import { auth, getUserWithUID } from './firebase';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
    const loading = useAppSelector(selectLoading);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        location.pathname === '/chat' &&
            dispatch(setLoading({ state: true, message: 'Đang đăng nhập' }));

        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = await getUserWithUID(currentUser.uid);

                if (userData) {
                    dispatch(setUser(userData));

                    dispatch(setLoading({ state: false }));
                    navigate('/chat', { replace: true });
                }
            }

            if (!currentUser) {
                dispatch(setUser(null));
                dispatch(setLoading({ state: false }));

                location.pathname !== '/' &&
                    navigate('/sign-in', { replace: true });
            }
        });
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='chat' element={<Chat />} />
            </Routes>

            {loading.state && (
                <>
                    <div className='black-shadow bg-black'></div>
                    <Loading msg={loading.message} />
                </>
            )}
        </>
    );
};

export default App;
