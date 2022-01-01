import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectModal, setModal } from '../features/modal/modalSlice';

const Modal = () => {
    const modal = useAppSelector(selectModal);
    const dispatch = useAppDispatch();

    const closeModal = () => dispatch(setModal({ isModalOpen: false }));

    return (
        <>
            <div className='black-shadow opacity-50' onClick={closeModal} />

            <div className='z-20 fixed-center w-full max-w-[90%] lg:max-w-[500px] rounded-[10px] px-4 py-7 bg-white'>
                <div className='grid place-items-center space-y-5'>
                    <p className='text-[25px] font-semibold'>Thông báo</p>

                    <div className='flex items-stretch gap-1'>
                        <div>
                            <Icon
                                className='text-teal-500'
                                icon='clarity:success-standard-solid'
                                fontSize={25}
                            />
                        </div>

                        <p className='text-center'>{modal.message}</p>
                    </div>

                    <button
                        className='btn px-10 py-2 font-semibold'
                        onClick={closeModal}>
                        Tiếp tục
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;
