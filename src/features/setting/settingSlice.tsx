import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LanguageType, ThemeType } from '../../types';

interface SettingProps {
    language: LanguageType;
    theme: ThemeType;
}

const initialState: SettingProps = {
    language: (localStorage.getItem('language') as LanguageType) || 'vn',
    theme: (localStorage.getItem('theme') as ThemeType) || 'light',
};

const language = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, { payload }: PayloadAction<LanguageType>) => {
            state.language = payload;
            localStorage.setItem('language', payload);
        },
        setTheme: (state, { payload }: PayloadAction<ThemeType>) => {
            state.theme = payload;
            localStorage.setItem('theme', payload);
        },
    },
});

export const { setLanguage, setTheme } = language.actions;
export const selectLanguage = (state: RootState) => state.setting.language;
export const selectTheme = (state: RootState) => state.setting.theme;
export default language.reducer;
