const readCSV = require('./utils/csvReader');
const { getLastFivePosts, createNewPost } = require('./utils/wordpressAPI');
const generateBlogPost = require('./utils/openaiAPI');
const fetchRelevantNews = require('./utils/newsAPI');
const sendEmail = require('./utils/email');

const isDryRun = process.argv.includes('--dry-run');

async function main() {
  const websites = await readCSV();
  for (const website of websites) {
    const pastPosts = await getLastFivePosts(website.website_name, website.token);
    const newsArticles = await fetchRelevantNews(website.context);
    const { title, content } = await generateBlogPost(website.context, pastPosts, newsArticles);

    if (!isDryRun) {
      await createNewPost(website.website_name, website.token, title, content);
    }

    await sendEmail('mallen7@sent.com', content, newsArticles);

    if (isDryRun) {
      console.log('Dry run mode: No blog post was actually created.');
    }
  }
}

main().catch(console.error);
