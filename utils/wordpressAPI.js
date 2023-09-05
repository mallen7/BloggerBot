const axios = require('axios');

async function getLastFivePosts(website, token) {
  try {
    const response = await axios.get(`https://${website}/wp-json/wp/v2/posts?per_page=5`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for ${website}:`, error);
    return [];
  }
}

async function createNewPost(website, token, title, content) {
    const url = `https://${website}/wp-json/wp/v2/posts`;
    const headers = { 'Authorization': `Bearer ${token}` };
    const data = {
      title: title,
      content: content,
      status: 'publish'
    };
  
    try {
      const response = await axios.post(url, data, { headers });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Failed to create a new post on ${website}: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

module.exports = { getLastFivePosts, createNewPost };
