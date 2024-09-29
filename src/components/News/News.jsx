import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import newsConfig from '../../config/newsConfig';
import { useQuery } from 'react-query'

const fetchNews = async ()=> {

    try{
        const response = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-08-29&sortBy=publishedAt&apiKey=${newsConfig.apiKey}`);
        const data = response.data;

        if(!data){
            throw new Error('Incomplete weather data');
        }
        return response.data;

    } catch(error){
        console.log("Error fetching news", error);
    }
}



const News = () => {

  const { data, error, isLoading } = useQuery({queryKey: ["newskey"], queryFn: fetchNews});
  const [currentIndex, setCurrentIndex] = useState(0);

  //Function to cycle through articles
  const nextArticle = ()=>{
    if(data && data.articles){
        setCurrentIndex((prevIndex)=>(prevIndex+1) %data.articles.length);
    }
   }
// Use an interval to change articles every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextArticle, 5000); // Change article every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [data]); // Dependency on data to reset if articles change

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="news">
        <h1>News</h1>
      {data && data.articles.length > 0 && (
        <p>{data.articles[currentIndex].title}</p>
      )}
        
    </div>
  )
}

export default News