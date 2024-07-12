import React from 'react';

const DateSelector = ({ today, date, setDate }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    let newDate;
    
    switch (selectedValue) {
      case 'yesterdays-date':
        
        newDate = new Date(today);
        newDate.setDate(today.getDate() + 1);
        break;
      case 'today-date':
        newDate = today;
        break;
      case 'tomorrows-date':
        newDate = new Date(today);
        newDate.setDate(today.getDate() - 1);
        break;
      default:
        newDate = today;
    }

    setDate(newDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
  };

  return (
    <div className='text-center'>
      <p className='mb-4 text-lg'>Override Date: <b>{date}</b></p>
      <select
        name="override-date"
        id="override-date"
        className="bg-[var(--semantic-background-primary)] text-[var(--semantic-type-primary)] border rounded border-[var(--semantic-border-primary)] p-2 w-full max-w-[300px]"
        onChange={handleChange}
        defaultValue="today-date"
      >
        <option value="yesterdays-date">Yesterday&#39;s Date</option>
        <option  value="today-date">Today&#39;s Date</option>
        <option value="tomorrows-date">Tomorrow&#39;s Date</option>
      </select>
    </div>
  );
};

export default DateSelector;
