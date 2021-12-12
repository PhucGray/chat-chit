import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyD1Ikv6fFV-S2cqkmXc8P5Nlhd9oRwvfik',
    authDomain: 'chat-chit-cba58.firebaseapp.com',
    projectId: 'chat-chit-cba58',
    storageBucket: 'chat-chit-cba58.appspot.com',
    messagingSenderId: '542858189990',
    appId: '1:542858189990:web:d3407169278d3930762867',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
