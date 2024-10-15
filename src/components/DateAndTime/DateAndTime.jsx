import React from 'react';

const getFormattedDate = () => {
  const date = new Date();

  // Options for formatting the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Add ordinal suffix (st, nd, rd, th)
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  // Replace the day in the formatted date with the day and its suffix
  return formattedDate.replace(day.toString(), day + suffix);
};


const DateAndTime = () => {
  const formattedDate = getFormattedDate();


  return (
    <div className="date-and-time-container">
      <div className="date-content">
        {formattedDate}
      </div>
    </div>
  );
};

export default DateAndTime;