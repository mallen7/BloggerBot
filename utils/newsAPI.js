const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a21a5f440c6f43af85dcc8c944c5229f');

async function fetchRelevantNews(context) {
  try {
    const response = await newsapi.v2.everything({
      q: context,
      language: 'en',
      sortBy: 'relevancy',
      page: 3
    });

    if (response.status === 'ok') {
      const newsArticles = response.articles.map(article => article.url);
      console.log("Fetched news articles:", newsArticles);
      return newsArticles;
    } else {
      console.error('Failed to fetch news:', response.status);
      return [];
    }
  } catch (error) {
    console.error('An error occurred while fetching news:', error);
    return [];
  }
}

module.exports = fetchRelevantNews;
