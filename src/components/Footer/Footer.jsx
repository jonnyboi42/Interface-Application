import React from 'react'

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

const Footer = () => {

    const formattedTime = getFormattedTime();

  return (
    <div className="footer-container">
   
      <div className="time-content">
        {formattedTime}
      </div>
    </div>
  );
    
    
}

export default Footer