const OpenAIApi = require('openai');
const config = require('../config.json');  // Adjust the path as needed

const openai = new OpenAIApi({ apiKey: config.openai.OPENAI_API_KEY });

console.log(`API Key from config: ${config.openai.OPENAI_API_KEY}`);

async function generateBlogPost(context, pastPosts, newsArticles) {
  try {
    // Convert pastPosts and newsArticles to a readable string format
    const pastPostsString = pastPosts.map(post => post.title.rendered).join(', ');
    const newsArticlesString = newsArticles.join(', ');

    // Construct the prompt
    const prompt = `Context: ${context}\nPast Posts: ${pastPostsString}\nNews Articles: ${newsArticlesString}\n\nPlease generate a blog post with the following:\nTitle:\n\nContent:`;
    
    console.log("Sending this prompt to OpenAI:", prompt);

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    console.log("API Response:", JSON.stringify(response, null, 2));

    if (!response || !response.choices || response.choices.length === 0 || !response.choices[0].message.content) {
      console.error("Invalid API response");
      return;
    }

    const splitText = response.choices[0].message.content.trim().split('\n');
    const title = splitText[0];
    const content = splitText.slice(1).join('\n');
    
    return { title, content };
  } catch (error) {
    console.error("Error in generateBlogPost:", error);
  }
}

module.exports = generateBlogPost;
