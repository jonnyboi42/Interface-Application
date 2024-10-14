import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import CalendarIcon from '../../icons/calendar.svg';

const Reminders = () => {
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [remindersList, setRemindersList] = useState([]); // State to store reminders
  const colRef = collection(db, 'reminders');

  // Fetch reminders when the component mounts
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const remindersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRemindersList(remindersData); // Store fetched reminders in state
      } catch (error) {
        console.log('Error fetching reminders', error);
      }
    };

    fetchReminders(); // Call the function to fetch reminders
  }, []);

  // Function to toggle between showing reminders and the add-reminder form
  const handleAddReminderClick = () => {
    setIsAddingReminder(true);
  };

  // Function to save Reminder to Firestore
  const handleSaveReminder = async () => {
    if (reminderTitle && dueDate) {
      try {
        await addDoc(colRef, {
          title: reminderTitle,
          dueDate: dueDate,
        });
        console.log('Reminder added!');
        setIsAddingReminder(false); // Return to reminders view after adding
        setReminderTitle('');
        setDueDate('');

        // Refetch reminders after adding a new one
        const snapshot = await getDocs(colRef);
        const updatedReminders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRemindersList(updatedReminders);
      } catch (error) {
        console.log('Error adding Reminder', error);
      }
    } else {
      console.log('Please fill in both fields');
    }
  };

  // Function to delete a reminder from Firestore
  const handleDeleteReminder = async (id) => {
    try {
      const reminderDocRef = doc(db, 'reminders', id);
      await deleteDoc(reminderDocRef);
      console.log('Reminder deleted!');

      // Update the reminders list after deletion
      const snapshot = await getDocs(colRef);
      const updatedReminders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRemindersList(updatedReminders);
    } catch (error) {
      console.log('Error deleting reminder', error);
    }
  };

  return (
    <div className="all-reminders-container">
      <div className="reminders-container">
        <div className="reminders-content">
          <div className="reminder-title">
            <p>Reminders</p>
          </div>

          <div className="reminders-items">
            {!isAddingReminder ? (
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
                  className="reminder-title-input"
                  type="text"
                  placeholder="Type Something..."
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                />
                <input
                  className="date-input"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <button className="save-reminder-button" onClick={handleSaveReminder}>
                  Save
                </button>
                <button className="back-reminder-button" onClick={() => setIsAddingReminder(false)}>
                  back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="future-reminders-container">
        <div className="future-reminders-content">
          <p>Upcoming</p>
          {/* Dynamically render reminders from Firestore */}
          {remindersList.length > 0 ? (
            remindersList.map((reminder) => (
              <div className="future-reminder-item" key={reminder.id}>
                <div className="future-reminder-item-title-and-date">
                  <div className="future-reminder-item-reminder">
                    <div className="future-reminder-icon-and-title">
                      <img src={CalendarIcon} alt="" />
                      <p>{reminder.title}</p>
                    </div>
                    <p className="future-reminder-due-date">{reminder.dueDate}</p>
                  </div>
                </div>
                <button
                  className="future-remove-button"
                  onClick={() => handleDeleteReminder(reminder.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming reminders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;