import { Icon } from '@iconify/react';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import DateTimePicker from '../../components/DateTimePicker';
import { selectUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import AvatarImg from '../../images/defaultAvatar.png';
import { SubmitFormType, UserType } from '../../types';

type InfoField = 'phoneNumber' | 'birth';

interface InfoProps {
    field: InfoField;
    title: string;
    user: UserType;
    data?: string;
    icon: string;
}

const ProfileTab = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <div className='min-h-screen mx-auto flex flex-col items-center justify-center space-y-5'>
                <img
                    className='h-[100px] w-[100px] rounded-[10px]'
                    src={user.photoURL || AvatarImg}
                    alt='Home'
                />

                <div className='w-full max-w-[400px] px-[20px] sm:px-[40px] py-[20px] rounded-[10px] space-y-3 bg-white text-[18px] sm:text-[23px]'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <Icon icon='carbon:email' />
                            <p className='truncate'>{user.email}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <Icon icon='si-glyph:badge-name' />
                            <p className='truncate'>{user.displayName}</p>
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

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const isBirthField = field === 'birth';

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [hasData, setHasData] = useState(!!data);

    const handleSubmit = async (e: SubmitFormType) => {
        e.preventDefault();

        if (isBirthField) {
            const birth = `${day}-${month}-${year}`;

            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, { [field]: birth }).then(() => {
                setHasData(true);
            });

            setValue(birth);
        } else {
            if (value.trim() && value !== prevValue) {
                const userDoc = doc(db, 'users', user.uid);
                await updateDoc(userDoc, { [field]: value }).then(() => {
                    setHasData(true);
                });
            } else setValue(prevValue);

            setIsAdd(false);
        }

        isEdit && setIsEdit(false);
    };

    const handleDelete = async (field: InfoField) => {
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, { [field]: null });
    };

    useEffect(() => {
        if (data) {
            const datetime = data.split('-');
            setDay(datetime[0]);
            setMonth(datetime[1]);
            setYear(datetime[2]);
        }
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            {hasData && (
                <>
                    {isEdit && (
                        <div className='space-y-2'>
                            <div className='flex items-center space-x-2'>
                                <Icon icon={icon} />

                                {isBirthField && (
                                    <DateTimePicker
                                        day={day}
                                        month={month}
                                        year={year}
                                        setDay={setDay}
                                        setMonth={setMonth}
                                        setYear={setYear}
                                    />
                                )}

                                {!isBirthField && (
                                    <input
                                        value={value}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                        className='input-text w-full'
                                        autoFocus
                                        type='text'
                                    />
                                )}
                            </div>

                            <div className='flex items-center space-x-2'>
                                <button
                                    onClick={() => {
                                        setValue(prevValue);
                                        setIsEdit(false);
                                    }}
                                    className='btn-outlined ml-auto px-[40px] py-[5px]'
                                    type='button'>
                                    Huỷ
                                </button>
                                <button
                                    className='btn px-[40px] py-[5px]'
                                    type='submit'>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    )}

                    {!isEdit && (
                        <div className='flex items-center justify-between relative group'>
                            <div className='max-w-[80%] flex items-center space-x-3'>
                                <Icon icon={icon} />
                                <p className='truncate'>{value}</p>
                            </div>

                            <Icon
                                className='rounded-full cursor-pointer hover:bg-gray-100 invisible group-hover:visible'
                                icon='akar-icons:more-horizontal'
                                fontSize={35}
                                onClick={() => setIsOptionOpen(true)}
                            />

                            {isOptionOpen && (
                                <>
                                    <div
                                        className='exit-zone'
                                        onClick={() => setIsOptionOpen(false)}
                                    />
                                    <div className='absolute right-[35px]  w-[200px] bg-blue-50 border z-10'>
                                        <button
                                            className='btn w-full flex  items-center space-x-3 pl-[10px] py-[5px] rounded-[5px]'
                                            onClick={() => {
                                                setIsEdit(true);
                                                setPrevValue(value);
                                                setIsOptionOpen(false);
                                            }}>
                                            <Icon
                                                className=' hover:text-teal-500'
                                                icon='fa-regular:edit'
                                            />

                                            <p>Sửa</p>
                                        </button>

                                        <button
                                            className='btn w-full flex items-center space-x-3 pl-[10px] py-[5px] rounded-[5px]'
                                            onClick={() => {
                                                setIsOptionOpen(false);
                                                setHasData(false);
                                                handleDelete(field);
                                            }}>
                                            <Icon
                                                className=' hover:text-teal-500'
                                                icon='bi:trash'
                                            />

                                            <p>Xoá</p>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}

            {!hasData && (
                <>
                    <div
                        onClick={() => setIsAdd(!isAdd)}
                        className='flex items-center space-x-2 text-teal-500 cursor-pointer hover:underline'>
                        <Icon icon='carbon:add-alt' />
                        <p>Thêm {title}</p>
                    </div>

                    {isAdd && (
                        <>
                            {/* Birth Field */}
                            {isBirthField && (
                                <div className='space-y-3'>
                                    <DateTimePicker
                                        day={day}
                                        month={month}
                                        year={year}
                                        setDay={setDay}
                                        setMonth={setMonth}
                                        setYear={setYear}
                                    />
                                    <div className='flex items-center space-x-2'>
                                        <button
                                            onClick={() => {
                                                setValue(prevValue);
                                                setIsEdit(false);
                                            }}
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
                            )}

                            {/* Phonenumber, locaiton Field */}
                            {!isBirthField && (
                                <div className='space-y-2 grid place-items-center justify-center'>
                                    <input
                                        value={value}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                        className='input-text'
                                        autoFocus
                                        type='text'
                                    />

                                    <div className='flex items-center space-x-2 ml-auto'>
                                        <button
                                            onClick={() => setIsAdd(false)}
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
                            )}
                        </>
                    )}
                </>
            )}
        </form>
    );
};

export default ProfileTab;
