import { ChangeEvent, FormEvent } from 'react';

export type ChangeSelectType = ChangeEvent<HTMLSelectElement>;
export type SubmitFormType = FormEvent<HTMLFormElement>;
//
export type TabType = 'chat' | 'profile' | 'friend' | 'setting';

export interface IdentificationType {
    fieldId: string;
    uid: string;
}

export interface UserType extends IdentificationType {
    email: string;
    displayName: string;
    //
    photoURL?: string;
    phoneNumber?: string;
    birth?: string;
    friends?: string[];
    friendRequests?: string[];
    requests?: string[];
}
