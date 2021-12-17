import { Icon } from '@iconify/react';

interface LoadingProps {
    msg?: string;
}

const Loading = ({ msg }: LoadingProps) => {
    return (
        <div className='fixed-center space-y-2 text-teal-500 z-20'>
            <Icon
                className='animate-bounce mx-auto'
                icon='ic:baseline-pending'
                fontSize={60}
            />

            <p className='text-[18px] text-center font-semibold'>{msg}</p>
        </div>
    );
};

export default Loading;
