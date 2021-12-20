import { async } from '@firebase/util';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Loading from './components/Loading';
import { selectLoading, setLoading } from './features/loading/loadingSlice';
import { selectUser, setUser } from './features/user/userSlice';
import { auth, getUserWithUID, logout } from './firebase';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getAuthenticated } from './utils/storage';

const App = () => {
    const loading = useAppSelector(selectLoading);
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isChatPage = location.pathname === '/chat';
    const isHomePage = location.pathname === '/';
    const isSignUpPage = location.pathname === '/sign-up';

    useEffect(
        () =>
            window.addEventListener('storage', async () => {
                if (getAuthenticated()) {
                    if (!user?.uid) localStorage.removeItem('authenticated');
                } else {
                    dispatch(setUser(null));
                    await signOut(auth);
                    isChatPage && navigate('/sign-in', { replace: true });
                }
            }),
        [],
    );

    useEffect(() => {
        if (getAuthenticated()) {
            !isSignUpPage && navigate('chat', { replace: true });
            dispatch(setLoading({ state: true, message: 'Đang đăng nhập' }));
        } else {
            isChatPage && navigate('sign-in', { replace: true });
        }

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = await getUserWithUID(currentUser.uid);

                userData && dispatch(setUser(userData));
            }

            dispatch(setLoading({ state: false }));
        });

        return () => unsub();
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
                    <div className='black-shadow'></div>
                    <Loading msg={loading.message} />
                </>
            )}
        </>
    );
};

export default App;
