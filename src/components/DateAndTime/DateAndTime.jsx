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

const getFormattedTime = () => {
  const date = new Date();

  // Get hours, minutes, and seconds
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Format minutes to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
};

const DateAndTime = () => {
  const formattedDate = getFormattedDate();
  const formattedTime = getFormattedTime();

  return (
    <div className="date-and-time-container">
      <div className="date-content">
        {formattedDate}
      </div>
      <div className="time-content">
        {formattedTime}
      </div>
    </div>
  );
};

export default DateAndTime;