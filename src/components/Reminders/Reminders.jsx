import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import CalendarIcon from '../../icons/calendar.svg';

const Reminders = () => {
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState(''); 
  const [remindersList, setRemindersList] = useState([]); 
  const [todayReminder, setTodayReminder] = useState(null); 
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  const colRef = collection(db, 'reminders');

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const remindersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRemindersList(remindersData);

        const currentDate = getCurrentDate();
        const todayReminders = remindersData.find(reminder => reminder.dueDate === currentDate);
        setTodayReminder(todayReminders || null);

        // Calculate total amount
        const total = remindersData.reduce((acc, reminder) => acc + (reminder.amount || 0), 0);
        setTotalAmount(total);
      } catch (error) {
        console.log('Error fetching reminders', error);
      }
    };

    fetchReminders();
  }, []);

  const handleAddReminderClick = () => {
    setIsAddingReminder(true);
  };

  const handleSaveReminder = async () => {
    if (reminderTitle && dueDate && amount) {
      try {
        await addDoc(colRef, {
          title: reminderTitle,
          dueDate: dueDate,
          amount: parseFloat(amount), 
        });
        console.log('Reminder added!');
        setIsAddingReminder(false);
        setReminderTitle('');
        setDueDate('');
        setAmount(''); 

        const snapshot = await getDocs(colRef);
        const updatedReminders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRemindersList(updatedReminders);

        const currentDate = getCurrentDate();
        const todayReminders = updatedReminders.find(reminder => reminder.dueDate === currentDate);
        setTodayReminder(todayReminders || null);

        // Recalculate total amount
        const total = updatedReminders.reduce((acc, reminder) => acc + (reminder.amount || 0), 0);
        setTotalAmount(total);
      } catch (error) {
        console.log('Error adding Reminder', error);
      }
    } else {
      console.log('Please fill in all fields');
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const reminderDocRef = doc(db, 'reminders', id);
      await deleteDoc(reminderDocRef);
      console.log('Reminder deleted!');

      const snapshot = await getDocs(colRef);
      const updatedReminders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRemindersList(updatedReminders);

      const currentDate = getCurrentDate();
      const todayReminders = updatedReminders.find(reminder => reminder.dueDate === currentDate);
      setTodayReminder(todayReminders || null);

      // Recalculate total amount
      const total = updatedReminders.reduce((acc, reminder) => acc + (reminder.amount || 0), 0);
      setTotalAmount(total);
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
                      <p>{todayReminder.title} - ${todayReminder.amount}</p> 
                    ) : (
                      <p>Nothing Due</p>
                    )}
                  </div>
                  <div className="reminder-item-due-date">
                    {todayReminder ? (
                      <p>{todayReminder.dueDate}</p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>

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
                <input
                  className="amount-input"
                  type="number"
                  placeholder="Amount ($)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
          {remindersList.length > 0 ? (
            remindersList.map((reminder) => (
              <div className="future-reminder-item" key={reminder.id}>
                <div className="future-reminder-item-title-and-date">
                  <div className="future-reminder-item-reminder">
                    <div className="future-reminder-icon-and-title">
                      <img src={CalendarIcon} alt="" />
                      <p>{reminder.title} - ${reminder.amount}</p>
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

      {/* Total Amount Container */}
      <div className="total-amount-container">
        <p>Total Monthly Amount</p>
        <p> ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Reminders;
