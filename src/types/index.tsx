import { ChangeEvent, FormEvent } from 'react';

export type ChangeSelectType = ChangeEvent<HTMLSelectElement>;
export type SubmitFormType = FormEvent<HTMLFormElement>;
//
export type TabType = 'chat' | 'profile' | 'friend' | 'setting';
export type UserType = {
    uid: string;
    email: string;
    //
    displayName: string;
    photoURL?: string;
    //
    phoneNumber?: string;
    birth?: string;
};
