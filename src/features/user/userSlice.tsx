import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RoomType, UserType } from '../../types';

interface UserProps {
    user: UserType | null;
    currentFriend: UserType | null;
    currentConversation: RoomType | null;
    friends: UserType[];
}

const initialState: UserProps = {
    user: null,
    currentFriend: null,
    currentConversation: null,
    friends: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<UserType | null>) => {
            state.user = payload;
        },
        setCurrentFriend: (
            state,
            { payload }: PayloadAction<UserType | null>,
        ) => {
            state.currentFriend = payload;
        },
        setFriends: (state, { payload }: PayloadAction<UserType[]>) => {
            state.friends = payload;
        },
    },
});

export const { setUser, setCurrentFriend, setFriends } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectCurrentFriend = (state: RootState) =>
    state.user.currentFriend;
export const selectFriends = (state: RootState) => state.user.friends;

export default userSlice.reducer;
