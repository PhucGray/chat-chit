import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
    loading: false,
};

const loadingSlide = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },
    },
});

export const { setLoading } = loadingSlide.actions;
export const selectLoading = (state: RootState) => state.loading.loading;
export default loadingSlide.reducer;
