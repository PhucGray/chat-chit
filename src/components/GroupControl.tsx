import { FC } from 'react';

interface GroupControlProps {
    error: string;
    label: string;
}

const GroupControl: FC<GroupControlProps> = ({ children, error, label }) => {
    return (
        <div className='space-y-1'>
            <p className='font-semibold'>{label}</p>

            <div className='relative'>
                {children}

                {error && (
                    <div className='absolute right-0 z-10'>
                        <div
                            className='ml-auto mr-[20px] w-0 h-0 border-l-[10px] border-solid border-transparent
                                        border-r-[10px] border-b-[10px] border-b-[#dc2626]'
                        />
                        <div className='px-[10px] py-[7px] border-solid border-red-600 border bg-red-50 text-red-600 rounded-[5px]'>
                            {error}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupControl;
