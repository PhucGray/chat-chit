import { MdPending } from 'react-icons/md';

interface LoadingProps {
    msg?: string;
}

const Loading = ({ msg }: LoadingProps) => {
    return (
        <div className='fixed-center space-y-2 text-teal-500 z-20'>
            <MdPending className='animate-bounce mx-auto' fontSize={60} />

            <p className='text-[18px] text-center font-semibold'>{msg}</p>
        </div>
    );
};

export default Loading;
