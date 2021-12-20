import { Icon } from '@iconify/react';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/user/userSlice';
import {
    auth,
    getUserWithUID,
    googleProvider,
    usersCollectionRef,
} from '../firebase';
import { UserType } from '../types';
import { setAutheticated } from '../utils/storage';

const ButtonSignInWithGG = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        signInWithPopup(auth, googleProvider)
            .then(async (res: UserCredential) => {
                setAutheticated();

                navigate('/chat');

                const { email, phoneNumber, photoURL, displayName, uid } =
                    res.user;

                const basicInfo = {
                    email,
                    phoneNumber,
                    photoURL,
                    displayName,
                    uid,
                } as UserType;

                const userData = await getUserWithUID(uid);

                // sign-up (Add new user to database)
                if (!userData) {
                    const newUser = await addDoc(usersCollectionRef, basicInfo);
                    dispatch(setUser({ ...basicInfo, fieldId: newUser.id }));
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <button
            className='btn-outlined w-full py-[6px] lg:py-[10px] flex items-center justify-center space-x-3'
            onClick={handleGoogleClick}
            type='button'>
            <Icon icon='flat-color-icons:google' fontSize={30} />
            <p>Đăng nhập với Google</p>
        </button>
    );
};

export default ButtonSignInWithGG;