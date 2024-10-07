import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import newsConfig from '../../config/newsConfig';
import { useQuery } from 'react-query'



const fetchNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsConfig.apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("Error Fetching News data", error);
  }
};


const News = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["newskey"],
    queryFn: fetchNews,
  });
  const getArticles = () => {
    // Filter the articles to exclude those with a title of "[Removed]" and without an image
    const validArticles = data?.articles.filter(article => 
      article.title !== '[Removed]' && article.urlToImage
    );

    // Slice the first 3 valid articles
    const articlesToDisplay = validArticles.slice(0, 3);

    return articlesToDisplay.length > 0 ? (
      articlesToDisplay.map((article, index) => (
        <div key={index} className='article'>
          <p>{article.title}</p>
          <img className='article-image' src={article.urlToImage} alt={article.title} />
        </div>
      ))
    ) : (
      <p>No valid articles available.</p>
    );
  };



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="news-container-content">
      <div className="news-content">
        <h1>News</h1>
        {getArticles()}
      </div>
    </div>
  );
};

export default News;