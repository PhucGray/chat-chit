import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
    isAlertOpen: false,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setIsAlertOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isAlertOpen = payload;
        },
    },
});

export const { setIsAlertOpen } = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alert.isAlertOpen;
export default alertSlice.reducer;
