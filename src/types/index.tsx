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
    //
    friends: string[];
    friendRequests: string[];
    requests: string[];
    conversationIds: string[];
}

export interface RoomType {
    fieldId?: string;
    members: string[]; // uid[]
    messages: MessageType[];
    lastSent: string; // time
}

export interface MessageType {
    messageId: string;
    uid: string;
    msg: {
        type: 'text' | 'image' | 'video';
        content: any;
    };
    sentAt: string;
}
