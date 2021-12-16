import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChangeSelectType } from '../types';

interface DateTimePickerProps {
    day: string;
    month: string;
    year: string;
    setDay: Dispatch<SetStateAction<string>>;
    setMonth: Dispatch<SetStateAction<string>>;
    setYear: Dispatch<SetStateAction<string>>;
}

const DateTimePicker = ({
    day,
    month,
    year,
    setDay,
    setMonth,
    setYear,
}: DateTimePickerProps) => {
    const [days, setDays] = useState([] as number[]);
    const [months, setMonths] = useState([] as number[]);
    const [years, setYears] = useState([] as number[]);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const getDays = (maxDay: number) => {
        const newDays = [];
        for (let i = 1; i <= maxDay; i++) {
            newDays.push(i);
        }

        return newDays;
    };

    const getMonths = (maxMonth: number) => {
        const newMonths = [];
        for (let i = 1; i <= maxMonth; i++) {
            newMonths.push(i);
        }

        return newMonths;
    };

    const getYears = () => {
        const newYears = [];

        for (let i = 1900; i <= new Date().getFullYear(); i++) {
            newYears.push(i);
        }

        return newYears;
    };

    useEffect(() => {
        setYears(getYears());
        setMonths(getMonths(12));
        setDays(getDays(31));
    }, []);

    const handleYearChange = (e: ChangeSelectType) => {
        const year = Number(e.target.value);
        const selectedMonth = Number(month);

        setYear(year.toString());

        if (year === currentYear) {
            setMonths(getMonths(currentMonth));
            if (selectedMonth === currentMonth) setDays(getDays(currentDay));
            return;
        }

        if (selectedMonth === 2) {
            const selectedYear = Number(year);

            if (selectedYear % 4 === 0 && selectedYear % 100 !== 0)
                setDays(getDays(29));
            else setDays(getDays(28));
        }
    };

    const handleMonthChange = (e: ChangeSelectType) => {
        const month = Number(e.target.value);
        setMonth(month.toString());

        if (month === currentMonth) {
            setDays(getDays(currentDay));
            return;
        }

        if ([1, 3, 5, 7, 8, 10, 12].includes(month))
            return setDays(getDays(31));

        if ([4, 6, 9, 11].includes(month)) return setDays(getDays(30));

        if (month === 2) {
            const selectedYear = Number(year);

            if (selectedYear % 4 === 0 && selectedYear % 100 !== 0)
                setDays(getDays(29));
            else setDays(getDays(28));
        }
    };

    return (
        <div className='flex space-x-3'>
            <div>
                <p className='text-base'>Ngày</p>
                <select
                    className='input'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}>
                    {days &&
                        days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <p className='text-base'>Tháng</p>
                <select
                    className='input'
                    value={month}
                    onChange={handleMonthChange}>
                    {months &&
                        months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <p className='text-base'>Năm</p>
                <select
                    className='input'
                    value={year}
                    onChange={handleYearChange}>
                    {years &&
                        years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
};

export default DateTimePicker;
