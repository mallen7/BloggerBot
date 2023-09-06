const OpenAIApi = require('openai');

const openai = new OpenAIApi({ key: 'OPENAI-API-KEY' });

async function generateBlogPost(context, pastPosts, newsArticles) {
  // Construct the prompt by combining the context, past posts, and news articles
  const prompt = `Context: ${context}\nPast Posts: ${pastPosts.join(' ')}\nNews Articles: ${newsArticles.join(' ')}\n\nTitle:\n\nContent:`;
  
  const response = await openai.createCompletion({ prompt: prompt, max_tokens: 500 });
  
  // Split the generated text into title and content
  const splitText = response.choices[0].text.trim().split('\n');
  const title = splitText[0];
  const content = splitText.slice(1).join('\n');
  
  return { title, content };
}

module.exports = generateBlogPost;
