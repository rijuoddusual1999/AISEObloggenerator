import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';

config();

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { topic, keywords } = req.body;

  const openai = new OpenAIApi(config);

  const postContentResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'You are a blog post generator',
      },
      {
        role: 'user',
        content: `Write a long and detailed SEO friendly blog post about ${topic}, that targets following keywords: ${keywords},
              The content should be formatted in SEO friendly HTML,
              limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li,ol, ul`,
      },
    ],
  });

  

  const postContent =
    postContentResponse.data.choices[0]?.message?.content;

  const titleResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'You are a blog post generator',
      },
      {
        role: 'user',
        content: `Write a long and detailed SEO friendly blog post about ${topic}, that targets following keywords: ${keywords},
          The content should be formatted in SEO friendly HTML,
          limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li,ol, ul`,
      },
      {
        role: 'assistant',
        content: postContent,
      },
      {
        role: 'user',
        content: 'Generate appropriate title tag text for the above blog post',
      },
    ],
  });

  const metaDescriptionResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'You are a blog post generator',
      },
      {
        role: 'user',
        content: `Write a long and detailed SEO friendly blog post about ${topic}, that targets following keywords: ${keywords},
      The content should be formatted in SEO friendly HTML,
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li,ol, ul`,
      },
      {
        role: 'assistant',
        content: postContent,
      },
      {
        role: 'user',
        content: 'Generate SEO friendly meta description for the above blog post',
      },
    ],
  });

  const title = titleResponse.data.choices[0]?.message?.content || '';
  const metaDescription =
    metaDescriptionResponse.data.choices[0]?.message?.content || '';

  console.log('POST CONTENT: ', postContent);
  console.log('TITLE', title);
  console.log('META DESCRIPTION', metaDescription);

  // Add code to send the response back to the client
  res.status(200).json({post: {postContent,title,metaDescription}});
}
