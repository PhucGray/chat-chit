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
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

// REFS

export const usersCollectionRef = collection(db, 'users');
export const conversationsCollectionRef = collection(db, 'conversations');

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
