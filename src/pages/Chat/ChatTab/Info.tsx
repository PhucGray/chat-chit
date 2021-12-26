import { Dispatch, FC, SetStateAction } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectLanguage } from '../../../features/setting/settingSlice';
import { selectCurrentFriend } from '../../../features/user/userSlice';
import AvatarImg from '../../../images/defaultAvatar.png';

interface InfoProps {
    isInfoOpen: boolean;
    setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
}

const Info: FC<InfoProps> = ({ isInfoOpen, setIsInfoOpen }) => {
    const currentFriend = useAppSelector(selectCurrentFriend);
    const isVietnames = useAppSelector(selectLanguage) === 'vn';
    return (
        <>
            {currentFriend && (
                <>
                    <div
                        className={`exit-zone ${
                            isInfoOpen ? 'block' : 'hidden'
                        } bg-black opacity-60 xl:hidden z-20`}
                        onClick={() => setIsInfoOpen(false)}
                    />

                    <div
                        className={`${
                            isInfoOpen ? 'flex' : 'hidden'
                        }  w-[300px] h-full pt-[40px] text-center flex-col items-center
                z-20 fixed right-0 top-0 bg-white shadow-lg space-y-1 
                xl:flex xl:static xl:shadow-none xl:bg-transparent`}
                        onClick={(e) => e.stopPropagation()}>
                        <div className='relative w-max'>
                            <img
                                className='rounded-full h-[80px] w-[80px] border'
                                src={currentFriend.photoURL || AvatarImg}
                                alt='Home'
                            />
                        </div>

                        <p className='font-bold text-[18px]'>
                            {currentFriend.displayName}
                        </p>

                        <div className='h-px w-[80%] bg-gray-400'></div>

                        <p className='font-bold text-[18px] w-[80%]'>
                            {isVietnames ? 'Hình ảnh' : 'Images'}
                        </p>

                        {/* <div className='w-[80%] grid grid-cols-3 gap-[5px]'>
                            <img
                                className='h-[80px] w-[80px]'
                                src={HomeImg}
                                alt='Home'
                            />
                            <img
                                className='h-[80px] w-[80px]'
                                src={HomeImg}
                                alt='Home'
                            />
                            <img
                                className='h-[80px] w-[80px]'
                                src={HomeImg}
                                alt='Home'
                            />
                            <img
                                className='h-[80px] w-[80px]'
                                src={HomeImg}
                                alt='Home'
                            />
                            <img
                                className='h-[80px] w-[80px]'
                                src={HomeImg}
                                alt='Home'
                            />
                            <img
                                className='h-[80px] w-[80px]'
                                src={HomeImg}
                                alt='Home'
                            />
                        </div> */}
                    </div>
                </>
            )}
        </>
    );
};

export default Info;
