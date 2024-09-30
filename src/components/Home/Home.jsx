import React from 'react'
import Header from '../Header/Header'
import Weather from '../Weather/Weather'
import News from '../News/News'
const Home = () => {
  return (
    
    <div className="home-container">
        <Header/>
        <Weather/>
        <News/>
    </div>
  )
}

export default Home