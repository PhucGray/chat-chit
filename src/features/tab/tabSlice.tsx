import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TabType } from '../../types';

interface TabProps {
    currentTab: TabType;
}

const initialState: TabProps = {
    currentTab: (sessionStorage.getItem('currentTab') as TabType) || 'chat',
};

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setCurrentTab: (state, { payload }: PayloadAction<TabType>) => {
            state.currentTab = payload;
        },
    },
});

export const { setCurrentTab } = tabSlice.actions;
export const selectCurrentTab = (state: RootState) => state.tab.currentTab;
export default tabSlice.reducer;
