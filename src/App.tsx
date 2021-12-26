import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { selectLoading, setLoading } from './features/loading/loadingSlice';
import { selectLanguage } from './features/setting/settingSlice';
import { selectUser, setUser } from './features/user/userSlice';
import { auth, getUserWithUID } from './firebase';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getAuthenticated, setAutheticated } from './utils/storage';

const App = () => {
    const loading = useAppSelector(selectLoading);
    const user = useAppSelector(selectUser);
    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isChatPage = location.pathname === '/chat';

    useEffect(
        () =>
            window.addEventListener('storage', async () => {
                if (getAuthenticated()) {
                    if (!user?.uid) localStorage.removeItem('authenticated');
                } else {
                    dispatch(setUser(null));
                    await signOut(auth);
                    navigate('/sign-in', { replace: true });
                }
            }),
        [],
    );

    useEffect(() => {
        if (getAuthenticated()) {
            dispatch(
                setLoading({
                    state: true,
                    message: isVietnames ? 'Đang đăng nhập' : 'Signing in...',
                }),
            );
            navigate('/chat', { replace: true });
        } else {
            isChatPage && navigate('/sign-in', { replace: true });
        }

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = await getUserWithUID(currentUser.uid);

                setAutheticated();

                navigate('/chat', { replace: true });

                dispatch(setUser(userData));
            } else {
                dispatch(setUser(null));
                await signOut(auth);
            }

            dispatch(setLoading({ state: false }));
        });

        return () => unsub();
    }, []);

    return (
        <>
            {!isChatPage && <Navbar />}

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
