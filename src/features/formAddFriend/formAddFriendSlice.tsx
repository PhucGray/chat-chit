import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
    isOpen: false,
};

const formAddFriendSlice = createSlice({
    name: 'formAddFriendSlice',
    initialState,
    reducers: {
        setIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload;
        },
    },
});

export const { setIsOpen } = formAddFriendSlice.actions;
export const selectIsFormAddFriendOpen = (state: RootState) =>
    state.formAddFriend.isOpen;
export default formAddFriendSlice.reducer;
