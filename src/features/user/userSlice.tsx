import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserType } from '../../types';

const initialState: UserType | null = {
    uid: '',
    email: '',
    displayName: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<UserType | null>) => {
            if (!payload) return;

            const { email, displayName, photoURL, uid, phoneNumber, birth } =
                payload;

            state.uid = uid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.phoneNumber = phoneNumber;
            state.birth = birth;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
