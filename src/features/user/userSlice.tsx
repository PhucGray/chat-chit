import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserType } from '../../types';

interface UserProps {
    user: UserType | null;
}

const initialState: UserProps = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<UserType | null>) => {
            state.user = payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
