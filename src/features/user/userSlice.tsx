import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserType } from '../../types';

const initialState: UserType | null = {
    uid: '',
    email: '',
    phoneNumber: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<UserType | null>) => {
            if (!payload) return;

            const { email, uid, phoneNumber, location, birth } = payload;

            state.email = email;
            state.uid = uid;
            state.phoneNumber = phoneNumber;
            state.location = location;
            state.birth = birth;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
