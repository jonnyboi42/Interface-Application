import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/SignIn/signin.css'
import './components/Home/home.css'
import './components/Header/header.css'
import './components/Weather/weather.css'
import './components/News/news.css'
import './components/DateAndTime/dateandtime.css'
import './components/Reminders/reminders.css'
import './components/Spotify/spotify.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
