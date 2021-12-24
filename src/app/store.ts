import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/user/userSlice';
import LoadingReducer from '../features/loading/loadingSlice';
import FormAddFriendReducer from '../features/formAddFriend/formAddFriendSlice';
import AlertReducer from '../features/alert/alertSlice';
import TabReducer from '../features/tab/tabSlice';
import ConversationReducer from '../features/conversation/conversationSlice';
import SettingReducer from '../features/setting/settingSlice';

export const store = configureStore({
    reducer: {
        user: UserReducer,
        loading: LoadingReducer,
        formAddFriend: FormAddFriendReducer,
        alert: AlertReducer,
        tab: TabReducer,
        conversation: ConversationReducer,
        setting: SettingReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
