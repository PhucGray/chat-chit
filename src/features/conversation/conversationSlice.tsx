import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RoomType } from '../../types';

interface ConversationProps {
    conversations: RoomType[];
    currentConversation: RoomType | null;
}

interface SingleConversationProps {
    conversationId: string;
    conversationData: RoomType;
}

const initialState: ConversationProps = {
    conversations: [],
    currentConversation: null,
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setConversations: (state, { payload }: PayloadAction<RoomType[]>) => {
            state.conversations = payload;
        },

        setSingleConversation: (
            state,
            { payload }: PayloadAction<SingleConversationProps>,
        ) => {
            const { conversationId, conversationData } = payload;

            state.conversations.forEach((conversation) => {
                if (conversation.fieldId === conversationId) {
                    conversation.messages = conversationData.messages;
                }
            });
        },
    },
});

export const { setConversations, setSingleConversation } =
    conversationSlice.actions;

export const selectCurrentConversation = (state: RootState) =>
    state.conversation.currentConversation;

export const selectConversations = (state: RootState) =>
    state.conversation.conversations;
export default conversationSlice.reducer;
