import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { useAppDispatch } from './app/hooks';

const firebaseConfig = {
    apiKey: 'AIzaSyD1Ikv6fFV-S2cqkmXc8P5Nlhd9oRwvfik',
    authDomain: 'chat-chit-cba58.firebaseapp.com',
    projectId: 'chat-chit-cba58',
    storageBucket: 'chat-chit-cba58.appspot.com',
    messagingSenderId: '542858189990',
    appId: '1:542858189990:web:d3407169278d3930762867',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const usersCollectionRef = collection(db, 'users');

export const googleProvider = new GoogleAuthProvider();

// FUNCTIONS
export const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('uid');
};

export const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(usersCollectionRef, { email });
};

export const signIn = async (email: string, password: string) => {
    const user = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem('uid', user.user.uid || '');

    return user;
};

