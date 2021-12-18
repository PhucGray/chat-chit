import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Loading from './components/Loading';
import { selectLoading, setLoading } from './features/loading/loadingSlice';
import { selectUser, setUser } from './features/user/userSlice';
import { auth, db, getUserWithUID } from './firebase';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { UserType } from './types';

const App = () => {
    const loading = useAppSelector(selectLoading);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useAppSelector(selectUser);

    useEffect(() => {
        location.pathname === '/chat' &&
            dispatch(setLoading({ state: true, message: 'Đang đăng nhập' }));

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
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
