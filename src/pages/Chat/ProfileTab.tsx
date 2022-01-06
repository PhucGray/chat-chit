import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import DateTimePicker from '../../components/DateTimePicker';
import { selectLanguage } from '../../features/setting/settingSlice';
import { selectUser } from '../../features/user/userSlice';
import { db } from '../../firebase';
import AvatarImg from '../../images/defaultAvatar.png';
import { SubmitFormType, UserType } from '../../types';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import {
    MdOutlineBadge,
    MdOutlineMoreHoriz,
    MdAddCircleOutline,
} from 'react-icons/md';
import { RiCake2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

type InfoField = 'phoneNumber' | 'birth' | 'displayName';

interface InfoProps {
    field: InfoField;
    title: string;
    user: UserType | null;
    data: string | '';
    icon: any;
}

const ProfileTab = () => {
    const user = useAppSelector(selectUser);
    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <>
            <div className='min-h-screen mx-auto flex flex-col items-center justify-center space-y-5'>
                <img
                    className='h-[100px] w-[100px] rounded-[10px]'
                    src={user?.photoURL || AvatarImg}
                    alt='Home'
                />

                <div
                    className='w-full max-w-[500px] px-[20px] py-[20px] rounded-[10px] bg-white text-[18px] 
                    sm:text-[23px] sm:px-[40px]
                    dark:bg-trueGray-700 dark:text-gray-400'>
                    <div className='w-max mx-auto space-y-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <AiOutlineMail />
                                <p className='truncate'>{user?.email}</p>
                            </div>
                        </div>

                        <Info
                            field='displayName'
                            title={isVietnames ? 'tên người dùng' : 'username'}
                            data={user?.displayName || ''}
                            user={user}
                            icon={<MdOutlineBadge />}
                        />

                        <Info
                            field='phoneNumber'
                            title={
                                isVietnames ? 'số điện thoại' : 'phone number'
                            }
                            data={user?.phoneNumber || ''}
                            user={user}
                            icon={<AiOutlinePhone />}
                        />

                        <Info
                            field='birth'
                            title={isVietnames ? 'ngày sinh' : 'day of birth'}
                            data={user?.birth || ''}
                            user={user}
                            icon={<RiCake2Line />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const Info = ({ field, title, data, user, icon }: InfoProps) => {
    const [value, setValue] = useState(data || '');
    const [prevValue, setPrevValue] = useState('');

    const [day, setDay] = useState('1');
    const [month, setMonth] = useState('1');
    const [year, setYear] = useState('1990');

    const isBirthField = field === 'birth';

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [hasData, setHasData] = useState(!!data);

    const handleSubmit = async (e: SubmitFormType) => {
        e.preventDefault();

        const userRef = doc(db, 'users', user?.fieldId || '');

        if (isBirthField) {
            const birth = `${day}-${month}-${year}`;

            await updateDoc(userRef, { [field]: birth }).then(() => {
                setHasData(true);
            });

            setValue(birth);
        } else {
            if (value.trim() && value !== prevValue) {
                await updateDoc(userRef, { [field]: value }).then(() => {
                    setHasData(true);
                });
            } else setValue(prevValue);

            setIsAdd(false);
        }

        isEdit && setIsEdit(false);
    };

    const handleDelete = async (field: InfoField) => {
        const userRef = doc(db, 'users', user?.fieldId || '');
        await updateDoc(userRef, { [field]: null });
    };

    useEffect(() => {
        if (data) {
            const datetime = data.split('-');
            setDay(datetime[0]);
            setMonth(datetime[1]);
            setYear(datetime[2]);

            setHasData(true);

            setValue(data);
        } else {
            setValue('');
            setHasData(false);
        }
    }, [data]);

    const isVietnames = useAppSelector(selectLanguage) === 'vn';

    return (
        <form onSubmit={handleSubmit}>
            {hasData && (
                <>
                    {isEdit && (
                        <div className='space-y-2'>
                            <div className='flex items-center space-x-2'>
                                {icon}

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
                                    {isVietnames ? 'Huỷ' : 'Cancle'}
                                </button>
                                <button
                                    className='btn px-[40px] py-[5px]'
                                    type='submit'>
                                    {isVietnames ? 'Lưu' : 'Save'}
                                </button>
                            </div>
                        </div>
                    )}

                    {!isEdit && (
                        <div className='flex items-center justify-between relative group'>
                            <div className='flex items-center space-x-3'>
                                {icon}
                                <p className='break-words'>
                                    {value.length > 20
                                        ? value.substring(0, 19).concat('...')
                                        : value}
                                </p>
                            </div>

                            <MdOutlineMoreHoriz
                                className='ml-[10px] rounded-full cursor-pointer hover:bg-gray-100 invisible group-hover:visible'
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
                                            <FaRegEdit className=' hover:text-teal-500' />
                                            <p>
                                                {isVietnames ? 'Sửa' : 'Edit'}
                                            </p>
                                        </button>

                                        <button
                                            className='btn w-full flex items-center space-x-3 pl-[10px] py-[5px] rounded-[5px]'
                                            onClick={() => {
                                                setIsOptionOpen(false);
                                                setHasData(false);
                                                handleDelete(field);
                                            }}>
                                            <RiDeleteBin6Line className=' hover:text-teal-500' />
                                            <p>
                                                {isVietnames ? 'Xoá' : 'Delete'}
                                            </p>
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
                        <MdAddCircleOutline />
                        <p>
                            {isVietnames ? 'Thêm' : 'Add'} {title}
                        </p>
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
                                            {isVietnames ? 'Huỷ' : 'Cancle'}
                                        </button>
                                        <button
                                            className='btn rounded-[10px] px-[40px] py-[5px]'
                                            type='submit'>
                                            {isVietnames ? 'Lưu' : 'Save'}
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
                                            {isVietnames ? 'Huỷ' : 'Cancle'}
                                        </button>
                                        <button
                                            className='btn rounded-[10px] px-[40px] py-[5px]'
                                            type='submit'>
                                            {isVietnames ? 'Lưu' : 'Save'}
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
