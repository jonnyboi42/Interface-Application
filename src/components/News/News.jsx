import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import newsConfig from '../../config/newsConfig';
import { useQuery } from 'react-query'

// const fetchNews = async ()=> {

//     try{
//         const response = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-08-29&sortBy=publishedAt&apiKey=${newsConfig.apiKey}`);
//         const data = response.data;

//         if(!data){
//             throw new Error('Incomplete weather data');
//         }
//         return response.data;

//     } catch(error){
//         console.log("Error fetching news", error);
//     }
// }



const News = () => {


  return (
    <div className="news-container-content">
      <div className="news-content">
        <h1>News</h1> 
        <p>Nissan Magnite facelift launch today. Price, features, specs, other details.</p>
        <p>Arab states reassure their neutrality to Iran amid conflict with Israel: Report.</p>
        <p>Pics: Actor Samantha visits Isha Foundation after Telangana minister's comments.</p>
      </div>
        
      
        
    </div>
  )
}

export default News