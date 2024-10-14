import React from 'react'
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase'
import CalendarIcon from '../../icons/calendar.svg'
import Reminder from '../../icons/reminder.svg'
const Reminders = () => {
    // State to track if we're in "add reminder" mode
    const [isAddingReminder, setIsAddingReminder] = useState(false);
    const [reminderTitle, setReminderTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const colRef = collection(db,'reminders');
  
    // Function to toggle between showing reminders and the add-reminder form
    const handleAddReminderClick = () => {
      setIsAddingReminder(true);
    };

  

    //Function to save Reminder to firestore 
    const handleSaveReminder = async () => {
      if(reminderTitle && dueDate){
        try{
          await addDoc(colRef, {
            title: reminderTitle,
            dueDate: dueDate,
          });
          console.log('Reminder added!')
          setIsAddingReminder(false); //Return to reminders view after adding
          setReminderTitle('');
          setDueDate('');
        } catch(error){
          console.log('Error adding Reminder', error);
        }
      } else {
        console.log('Please fill in both fields');
      }
    } 
  
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
              <div>
                <input
                    className='reminder-title-input'
                    type="text"
                    placeholder="Type Something..."
                    value={reminderTitle}
                    onChange={(e) => setReminderTitle(e.target.value)}
                />
                <input
                    className='date-input'
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button className='save-reminder-button' onClick={handleSaveReminder}>Save</button>
                <button className='back-reminder-button' onClick={()=> setIsAddingReminder(false)}>back</button>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Reminders;