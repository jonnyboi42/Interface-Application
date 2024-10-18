import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import newsConfig from '../../config/newsConfig';

// Function to fetch the news
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
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // New state for fading

  const { data, error, isLoading } = useQuery({
    queryKey: ["newskey"],
    queryFn: fetchNews,
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('newsArticles'));
    const savedDate = localStorage.getItem('newsFetchDate');
    const today = new Date().toISOString().split('T')[0]; // Get today's date

    if (savedArticles && savedDate === today) {
      setArticles(savedArticles);
    } else if (data?.articles) {
      const validArticles = data.articles
        .filter(article => article.title !== '[Removed]')
        .slice(0, 10);

      setArticles(validArticles);
      localStorage.setItem('newsArticles', JSON.stringify(validArticles));
      localStorage.setItem('newsFetchDate', today);
    }
  }, [data]);

  // Function to get 2 articles at a time
  const getArticlesToDisplay = () => {
    return articles.slice(currentIndex, currentIndex + 2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Start fading out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 2) % articles.length;
          return nextIndex;
        });
        setIsFading(false); // Fade back in
      }, 500); // Match this duration with the CSS transition duration
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [articles.length]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="news-container">
      <div className="news-title">
        <p>News</p>
      </div>
      <div className={`articles ${isFading ? 'articles-hidden' : ''}`}>
        {getArticlesToDisplay().map((article, index) => (
          <div key={index} className="article">
            <p className="article-text">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
