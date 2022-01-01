import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ModalProps {
    isModalOpen: boolean;
    message?: string;
}

const initialState: ModalProps = {
    isModalOpen: false,
    message: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, { payload }: PayloadAction<ModalProps>) => {
            const { isModalOpen, message } = payload;
            state.isModalOpen = isModalOpen;

            if (message) {
                state.message = message;
            }
        },
    },
});

export const { setModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
