import React from 'react'
import CalendarIcon from '../../icons/calendar.svg'
import Reminder from '../../icons/reminder.svg'
const Reminders = () => {
  return (
    <div className="reminders-container">
        <div className="reminders-content">
            <div className="reminder-title">
                <p>Reminders</p>
                {/* <img src={Reminder} alt="" /> */}
            </div>
            

            <div className="reminders-items">
                <div className="reminder-item">
                    <div className="reminder-item-reminder">
                        <img src={CalendarIcon} alt="" />
                        <p>Wells Fargo</p>
                    </div>
                    <div className="reminder-item-due-date">
                        <p>Jan 27th</p>
                    </div>

                </div>

                <button className='add-reminder'>Add</button>

            </div>
        </div>
    </div>
  )
}

export default Reminders