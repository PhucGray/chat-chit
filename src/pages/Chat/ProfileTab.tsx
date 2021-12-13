import { Icon } from '@iconify/react';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import HomeImg from '../../images/home.png';
import { SubmitFormType, UserType } from '../../types';

interface InfoProps {
    field: string;
    title: string;
    user: UserType;
    data?: string;
    icon: string;
}

const ProfileTab = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <div className='min-h-screen w-max mx-auto flex flex-col items-center justify-center space-y-5'>
                <img
                    className='h-[100px] w-[100px] rounded-[10px]'
                    src={HomeImg}
                    alt='Home'
                />

                <div className='w-screen max-w-[450px] px-[40px] py-[20px] rounded-[10px] space-y-3 bg-white text-[25px]'>
                    <div className='flex items-center justify-between text-[25px]'>
                        <div className='flex items-center space-x-3'>
                            <Icon icon='si-glyph:badge-name' />
                            <p className='truncate'>{user.email}</p>
                        </div>
                    </div>

                    <Info
                        field='phoneNumber'
                        title='số điện thoại'
                        data={user.phoneNumber}
                        user={user}
                        icon='akar-icons:phone'
                    />

                    <Info
                        field='location'
                        title='địa chỉ'
                        data={user.location}
                        user={user}
                        icon='akar-icons:location'
                    />

                    <Info
                        field='birth'
                        title='ngày sinh'
                        data={user.birth}
                        user={user}
                        icon='la:birthday-cake'
                    />
                </div>
            </div>
        </>
    );
};

const Info = ({ field, title, data, user, icon }: InfoProps) => {
    const [value, setValue] = useState(data || '');
    const [prevValue, setPrevValue] = useState('');

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [hasData, setHasData] = useState(!!data);

    const handleSubmit = async (e: SubmitFormType) => {
        e.preventDefault();

        if (value.trim()) {
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, { [field]: value }).then(() => {
                setHasData(true);
            });
        } else {
            setIsAdd(false);
            setValue(prevValue);
        }

        isEdit && setIsEdit(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            {hasData ? (
                <>
                    {isEdit ? (
                        <div className='space-y-2'>
                            <div className='flex items-center space-x-2'>
                                <Icon icon={icon} />
                                <input
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className='input-text w-full'
                                    autoFocus
                                    type='text'
                                />
                            </div>

                            <div className='flex items-center space-x-2 text-[18px]'>
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className='btn-outlined ml-auto px-[40px] py-[5px]'
                                    type='button'>
                                    Huỷ
                                </button>
                                <button
                                    className='btn rounded-[10px] px-[40px] py-[5px]'
                                    type='submit'>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <Icon icon={icon} />
                                <p>{value}</p>
                            </div>
                            <Icon
                                onClick={() => {
                                    setIsEdit(true);
                                    setPrevValue(value);
                                }}
                                className='ml-auto cursor-pointer hover:text-teal-500'
                                icon='fa-regular:edit'
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div
                        onClick={() => setIsAdd(!isAdd)}
                        className='flex items-center space-x-2 text-teal-500 cursor-pointer hover:underline'>
                        <Icon icon='carbon:add-alt' />
                        <p>Thêm {title}</p>
                    </div>

                    {isAdd && (
                        <div className='space-y-2 grid place-items-center'>
                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className='input-text'
                                autoFocus
                                type='text'
                            />
                            <div className='flex items-center space-x-2'>
                                <button
                                    onClick={() => setIsAdd(false)}
                                    className='btn-outlined px-[50px] py-[7px]'
                                    type='button'>
                                    Huỷ
                                </button>
                                <button
                                    className='btn rounded-[10px] px-[50px] py-[7px]'
                                    type='submit'>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </form>
    );
};

export default ProfileTab;
