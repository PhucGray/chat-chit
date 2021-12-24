import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ThemeType } from '../../types';

interface ThemeProps {
    theme: ThemeType;
}

const initialState: ThemeProps = {
    theme: (localStorage.getItem('theme') as ThemeType) || 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }: PayloadAction<ThemeType>) => {
            state.theme = payload;
            localStorage.setItem('theme', payload)
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;
export default themeSlice.reducer;
