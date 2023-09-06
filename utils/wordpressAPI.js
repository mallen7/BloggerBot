const axios = require('axios');
const config = require('../config.json');  // Adjust the path as needed

const username = config.wordpress.username;
const password = config.wordpress.password;

async function getJWTToken(website, username, password) {
    const url = `https://${website}/wp-json/jwt-auth/v1/token`;
    const data = {
      username: username,
      password: password
    };
    
    try {
      const response = await axios.post(url, data);
      return response.data.token;
    } catch (error) {
      console.error("Error during JWT token generation:", error.response ? error.response.data : error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  }

async function getLastFivePosts(website, token) {
  const url = `https://${website}/wp-json/wp/v2/posts?per_page=5`;
  const headers = { 'Authorization': `Bearer ${token}` };
  const response = await axios.get(url, { headers });
  return response.data;
}

async function createNewPost(website, token, title, content) {
  const url = `https://${website}/wp-json/wp/v2/posts`;
  const headers = { 'Authorization': `Bearer ${token}` };
  const data = {
    title: title,
    content: content,
    status: 'publish'
  };
  const response = await axios.post(url, data, { headers });
  return response.data;
}

module.exports = { getJWTToken, getLastFivePosts, createNewPost };
