import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface LoadingProps {
    state: boolean;
    message?:string
}

const initialState: LoadingProps = {
    state: false,
    message: ''
};

const loadingSlide = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<LoadingProps>) => {
        
            state.state = payload.state
            state.message = payload.message;
        },
    },
});

export const { setLoading } = loadingSlide.actions;
export const selectLoading = (state: RootState) => state.loading;
export default loadingSlide.reducer;
