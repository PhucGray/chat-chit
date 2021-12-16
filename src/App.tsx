import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Loading from './components/Loading';
import { selectLoading } from './features/loading/loadingSlide';
import { selectUser, setUser } from './features/user/userSlice';
import { auth, db } from './firebase';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { UserType } from './types';

const App = () => {
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);
    const isAuth = localStorage.getItem('uid') || user?.uid;

    const dispatch = useAppDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const q = query(
                    collection(db, 'users'),
                    where('email', '==', currentUser.email || ''),
                );

                const data = await getDocs(q);

                data.forEach((doc) => {
                    const {
                        uid,
                        email,
                        displayName,
                        photoURL,
                        phoneNumber,
                        birth,
                    } = doc.data() as UserType;

                    localStorage.setItem('uid', uid || '');

                    dispatch(
                        setUser({
                            uid: doc.id,
                            displayName,
                            photoURL,
                            email: email || '',
                            phoneNumber: phoneNumber,
                            birth,
                        }),
                    );
                });
            }

            if (!currentUser) {
                dispatch(setUser(null));
            }
        });
    }, []);

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        isAuth ? <Navigate to='/chat' replace /> : <Home />
                    }
                />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route
                    path='chat'
                    element={
                        isAuth ? <Chat /> : <Navigate to='/sign-in' replace />
                    }
                />
            </Routes>

            {loading && (
                <>
                    <div className='black-shadow bg-black opacity-70'></div>
                    <Loading />
                </>
            )}
        </>
    );
};

export default App;
