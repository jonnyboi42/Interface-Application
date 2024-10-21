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
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({
    rent: 0,
    subscriptions: 0,
    creditCards: 0,
    studentLoan: 0,
  });

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

        // Calculate total amount and category-wise totals
        calculateTotals(remindersData);
      } catch (error) {
        console.log('Error fetching reminders', error);
      }
    };

    fetchReminders();
  }, []);

  const calculateTotals = (reminders) => {
    let total = 0;
    let categoryWiseTotals = {
      rent: 0,
      subscriptions: 0,
      creditCards: 0,
      studentLoan: 0,
    };

    reminders.forEach(reminder => {
      const reminderAmount = reminder.amount || 0;
      total += reminderAmount;

      // Assign to categories based on title
      if (reminder.title.toLowerCase().includes('rent') || reminder.title.toLowerCase().includes('spectrum')) {
        categoryWiseTotals.rent += reminderAmount;
      } else if (reminder.title.toLowerCase().includes('spotify') || reminder.title.toLowerCase().includes('amazon')) {
        categoryWiseTotals.subscriptions += reminderAmount;
      } else if (reminder.title.toLowerCase().includes('citi') || reminder.title.toLowerCase().includes('wells fargo')) {
        categoryWiseTotals.creditCards += reminderAmount;
      } else if (reminder.title.toLowerCase().includes('student loan')) {
        categoryWiseTotals.studentLoan += reminderAmount;
      }
    });

    setTotalAmount(total);
    setCategoryTotals(categoryWiseTotals);
  };

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

        // Recalculate totals after adding
        calculateTotals(updatedReminders);
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

      // Recalculate totals after deletion
      calculateTotals(updatedReminders);
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
              <div className="reminders-items">
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
        <p>${totalAmount.toFixed(2)}</p>
      </div>

      {/* Category Totals Section */}
      <div className="category-totals-container">
        
        <p>Totals</p>
        <div className="category-totals">
          <p>
          Rent: <span className="cat-totals-amt">${categoryTotals.rent.toFixed(2)}</span>
          </p>
          <p>
            Subscriptions: <span className="cat-totals-amt">${categoryTotals.subscriptions.toFixed(2)}</span>
          </p>
          <p>
            Credit Cards: <span className="cat-totals-amt">${categoryTotals.creditCards.toFixed(2)}</span>
          </p>
          <p>
            Student Loan: <span className="cat-totals-amt">${categoryTotals.studentLoan.toFixed(2)}</span>
          </p>
        </div>


      </div>
    </div>
  );
};

export default Reminders;
