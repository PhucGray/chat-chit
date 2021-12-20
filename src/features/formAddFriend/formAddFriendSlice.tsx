import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
    isFormAddFriendOpen: false,
};

const formAddFriendSlice = createSlice({
    name: 'formAddFriendSlice',
    initialState,
    reducers: {
        setIsFormAddFriendOpen: (
            state,
            { payload }: PayloadAction<boolean>,
        ) => {
            state.isFormAddFriendOpen = payload;
        },
    },
});

export const { setIsFormAddFriendOpen } = formAddFriendSlice.actions;
export const selectIsFormAddFriendOpen = (state: RootState) =>
    state.formAddFriend.isFormAddFriendOpen;
export default formAddFriendSlice.reducer;
