import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setIsAlertOpen } from '../features/alert/alertSlice';

const Alert = () => {
    const dispatch = useAppDispatch();
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.style.transform = 'scale(1)';
            ref.current.style.transform = 'translateX(-50%)';
        }

        const timeout = setTimeout(() => {
            dispatch(setIsAlertOpen(false));
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <div
            ref={ref}
            className='w-[80%] text-center py-[10px] 
            fixed top-[40px] left-[50%] 
            transform scale-[0] duration-300 
            rounded-[10px] border border-teal-500 text-teal-900 bg-teal-300
            sm:w-max sm:px-[70px]'>
            Đăng ký thành công !
        </div>
    );
};

export default Alert;
