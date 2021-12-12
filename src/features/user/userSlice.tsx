import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type UserType = {
    email: string;
};

const initialState = {
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<UserType>) => {
            state.email = payload.email;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.email;
export default userSlice.reducer;
