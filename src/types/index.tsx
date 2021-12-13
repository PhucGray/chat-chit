import { FormEvent } from 'react';

export type SubmitFormType = FormEvent<HTMLFormElement>;
//
export type TabType = 'chat' | 'profile' | 'friend' | 'setting';
export type UserType = {
    uid: string;
    email: string;
    phoneNumber?: string;
    location?: string;
    birth?: string;
};
