import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import newsConfig from '../../config/newsConfig';

// Default image URL to use when no image is available
const defaultImageUrl = 'https://static01.nyt.com/images/2021/02/06/business/05NYDN-print/merlin_156955713_3b027363-8c47-47e4-9784-de7645763b48-superJumbo.jpg'; // Replace this with your actual default image URL

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
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const getMainArticle = () => {
    // Filter the articles to exclude those with a title of "[Removed]"
    const validArticles = data?.articles.filter(article => 
      article.title !== '[Removed]'
    );

    // Get the first valid article for the main content
    const mainArticle = validArticles.slice(0, 1);

    return mainArticle.length > 0 ? (
      mainArticle.map((article, index) => (
        <div key={index} className='article'>
          {/* If urlToImage is null, use the defaultImageUrl */}
          <img 
            className='article-image' 
            src={article.urlToImage || defaultImageUrl} 
            alt={article.title} 
          />
          <p className='article-text'>{article.title}</p>
        </div>
      ))
    ) : (
      <p>No valid articles available.</p>
    );
  };

  const getOtherArticles = () => {
    // Filter the articles to exclude those with a title of "[Removed]"
    const validArticles = data?.articles.filter(article => 
      article.title !== '[Removed]'
    );

    // Get 5 other articles for the titles list (skip the first one already displayed)
    const otherArticles = validArticles.slice(1, 6);

    return otherArticles.length > 0 ? (
      otherArticles.map((article, index) => (
        <p key={index} className='other-article-title'>
          {article.title}
        </p>
      ))
    ) : (
      <p>No other articles available.</p>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="news-container">
      <div className="main-news-content">
        {getMainArticle()}
      </div>
      <div className="other-news-content">
        {getOtherArticles()}
      </div>
    </div>
  );
};

export default News;
