import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import CalendarIcon from '../../icons/calendar.svg';

const Reminders = () => {
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [remindersList, setRemindersList] = useState([]); // State to store reminders
  const [todayReminder, setTodayReminder] = useState(null); // State to store today's reminder
  const colRef = collection(db, 'reminders');

  // Get current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format to match 'YYYY-MM-DD'
  };

  // Fetch reminders when the component mounts
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const remindersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRemindersList(remindersData);

        // Check for reminders due today
        const currentDate = getCurrentDate();
        const todayReminders = remindersData.find(reminder => reminder.dueDate === currentDate);
        setTodayReminder(todayReminders || null); // Set today's reminder or null if none found
      } catch (error) {
        console.log('Error fetching reminders', error);
      }
    };

    fetchReminders();
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

        // Update today's reminder check
        const currentDate = getCurrentDate();
        const todayReminders = updatedReminders.find(reminder => reminder.dueDate === currentDate);
        setTodayReminder(todayReminders || null);
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

      // Update today's reminder check
      const currentDate = getCurrentDate();
      const todayReminders = updatedReminders.find(reminder => reminder.dueDate === currentDate);
      setTodayReminder(todayReminders || null);
    } catch (error) {
      console.log('Error deleting reminder', error);
    }
  };

  return (
    <div className="all-reminders-container">
      <div className="reminders-container">
        <div className="reminders-content">
          <div className="reminder-title">
          <p>{isAddingReminder ? 'Add Reminder' : 'Due Today'}</p>
          </div>

          <div className="reminders-items">
            {!isAddingReminder ? (
              <div>
                <div className="reminder-item">
                  <div className="reminder-item-reminder">
                    <img src={CalendarIcon} alt="" />
                    {todayReminder ? (
                      <p>{todayReminder.title}</p> // Render the reminder if there's one due today
                    ) : (
                      <p>Nothing Due</p> // Default message if no reminders due today
                    )}
                  </div>
                  <div className="reminder-item-due-date">
                    {todayReminder ? (
                      <p>{todayReminder.dueDate}</p> // Render the due date if there's one due today
                    ) : (
                      <p></p> // Empty if no reminders due today
                    )}
                  </div>
                </div>

                {/* "Add +" button to switch to the add reminder form */}
                <button className="add-reminder" onClick={handleAddReminderClick}>
                  Add +
                </button>
              </div>
            ) : (
              <div className='reminders-items'>
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

                <div className="add-reminder-buttons">
                  <button className="save-reminder-button" onClick={handleSaveReminder}>
                    Save
                  </button>
                  <button className="back-reminder-button" onClick={() => setIsAddingReminder(false)}>
                    back
                  </button>
                </div>

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