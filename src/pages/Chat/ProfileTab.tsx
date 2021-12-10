import { Icon } from '@iconify/react';
import HomeImg from '../../images/home.png';

const ProfileTab = () => {
    return (
        <div className='min-h-screen w-max mx-auto flex flex-col items-center justify-center space-y-5'>
            <img
                className='h-[100px] w-[100px] rounded-[10px]'
                src={HomeImg}
                alt='Home'
            />

            <div className='w-screen max-w-[450px] px-[40px] py-[20px] rounded-[10px] space-y-3 bg-white'>
                <div className='flex items-center justify-between text-[25px] group'>
                    <div className='flex items-center space-x-3'>
                        <Icon icon='si-glyph:badge-name' />
                        <p className='truncate'>Adam Levince</p>
                    </div>

                    <Icon
                        className='ml-auto cursor-pointer hover:text-teal-500 hidden group-hover:block'
                        icon='fa-regular:edit'
                    />
                </div>

                <div className='flex items-center justify-between text-[25px] group'>
                    <div className='flex items-center space-x-3'>
                        <Icon icon='akar-icons:phone' />
                        <p>0123456789</p>
                    </div>

                    <Icon
                        className='ml-auto cursor-pointer hover:text-teal-500 hidden group-hover:block'
                        icon='fa-regular:edit'
                    />
                </div>

                <div className='flex items-center justify-between text-[25px] group'>
                    <div className='flex items-center space-x-3'>
                        <Icon icon='akar-icons:location' />
                        <p>LA</p>
                    </div>

                    <Icon
                        className='ml-auto cursor-pointer hover:text-teal-500 hidden group-hover:block'
                        icon='fa-regular:edit'
                    />
                </div>

                <div className='flex items-center justify-between text-[25px] group'>
                    <div className='flex items-center space-x-3'>
                        <Icon icon='cil:birthday-cake' />
                        <p>12/08/2002</p>
                    </div>

                    <Icon
                        className='ml-auto cursor-pointer hover:text-teal-500 hidden group-hover:block'
                        icon='fa-regular:edit'
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;
