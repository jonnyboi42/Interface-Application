import React from 'react'
import { useState } from 'react';
import CalendarIcon from '../../icons/calendar.svg'
import Reminder from '../../icons/reminder.svg'
const Reminders = () => {
    // State to track if we're in "add reminder" mode
    const [isAddingReminder, setIsAddingReminder] = useState(false);
  
    // Function to toggle between showing reminders and the add-reminder form
    const handleAddReminderClick = () => {
      setIsAddingReminder(true);
    };
  
    return (
      <div className="reminders-container">
        <div className="reminders-content">
          <div className="reminder-title">
            <p>Reminders</p>
          </div>
  
          <div className="reminders-items">
            {/* Conditionally render content based on the state */}
            {!isAddingReminder ? (
              // When not in "add reminder" mode, show the reminders list
              <div>
                <div className="reminder-item">
                  <div className="reminder-item-reminder">
                    <img src={CalendarIcon} alt="" />
                    <p>Wells Fargo</p>
                  </div>
                  <div className="reminder-item-due-date">
                    <p>Jan 27th</p>
                  </div>
                </div>
  
                {/* "Add +" button to switch to the add reminder form */}
                <button className="add-reminder" onClick={handleAddReminderClick}>
                  Add +
                </button>
              </div>
            ) : (
              // When in "add reminder" mode, show the new content (e.g., a form)
              <div>
                {/* You can replace this with a form if needed */}
    
                <input type="text" placeholder="Reminder Title" />
                <input type="date" />
                <button>Save Reminder</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Reminders;