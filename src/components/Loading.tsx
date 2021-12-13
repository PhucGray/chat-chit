import { Icon } from '@iconify/react';

interface LoadingProps {
    msg?: string;
}

const Loading = ({ msg }: LoadingProps) => {
    return (
        <div className='fixed-center space-y-2 text-teal-500 z-20'>
            <Icon
                className='mx-auto'
                icon='eos-icons:bubble-loading'
                fontSize={60}
            />

            {msg && <p className='text-center'>{msg}</p>}
        </div>
    );
};

export default Loading;
