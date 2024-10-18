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

  const { data, error, isLoading } = useQuery({
    queryKey: ["newskey"],
    queryFn: fetchNews,
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  useEffect(() => {
    // Check localStorage for saved articles and compare the timestamp
    const savedArticles = JSON.parse(localStorage.getItem('newsArticles'));
    const savedDate = localStorage.getItem('newsFetchDate');
    const today = new Date().toISOString().split('T')[0]; // Get today's date

    if (savedArticles && savedDate === today) {
      // If articles are already saved for today, use them
      setArticles(savedArticles);
    } else if (data?.articles) {
      // Filter and store only the first 10 valid articles
      const validArticles = data.articles
        .filter(article => article.title !== '[Removed]')
        .slice(0, 10);

      setArticles(validArticles);
      localStorage.setItem('newsArticles', JSON.stringify(validArticles));
      localStorage.setItem('newsFetchDate', today);
    }
  }, [data]);

  // Function to get 5 articles at a time
  const getArticlesToDisplay = () => {
    return articles.slice(currentIndex, currentIndex + 5);
  };

  // Function to display the next 5 articles
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      // If the next set of 5 exceeds the length, loop back
      return (prevIndex + 5) % articles.length;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="news-container">
      <div className="news-title">
        <p>News</p>
      </div>
      <div className="articles">
        {getArticlesToDisplay().map((article, index) => (
          <div key={index} className='article'>
            <p className='article-text'>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </p>
          </div>
        ))}

        {articles.length > 5 && (
          <button onClick={handleNext}>Next 5 Articles</button>
        )}
      </div>
      
    </div>
  );
};

export default News;
