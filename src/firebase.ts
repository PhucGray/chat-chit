import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { UserType } from './types';

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
    localStorage.removeItem('authenticated');
    sessionStorage.removeItem('currentTab');
    await signOut(auth);
};

export const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

export const getUserWithUID = async (uid: string) => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));

    const userDocs = await getDocs(q);

    const isEmpty = userDocs.empty;

    if (isEmpty) return null;

    const currentDoc = userDocs.docs[0];

    const userData = {
        ...currentDoc.data(),
        fieldId: currentDoc.id,
    } as UserType;

    return userData;
};
