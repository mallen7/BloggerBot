const axios = require('axios');
const config = require('../config.json');  // Adjust the path as needed
const basicAuth = 'Basic ' + new Buffer(config.wordpress.username + ':' + config.wordpress.password).toString('base64');

const username = config.wordpress.username;
const password = config.wordpress.password;

async function getLastFivePosts(website, token) {
  const url = `https://${website}/wp-json/wp/v2/posts?per_page=5`;
  const headers = { 'Authorization': basicAuth };
  const response = await axios.get(url, { headers });
  return response.data;
}

async function createNewPost(website, token, title, content) {
  const url = `https://${website}/wp-json/wp/v2/posts`;
  const headers = { 'Authorization': basicAuth };
  const data = {
    title: title,
    content: content,
    status: 'publish'
  };
  const response = await axios.post(url, data, { headers });
  return response.data;
}

module.exports = { getLastFivePosts, createNewPost };
