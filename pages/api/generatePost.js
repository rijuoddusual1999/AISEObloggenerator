import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
import {withApiAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';
import { getSession } from '@auth0/nextjs-auth0';

config();

export default withApiAuthRequired(async function handler(req, res) {
  const {user} = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("BlogBraniac");
  

  const userProfile = await db.collection("users").findOne({
     auth0Id: user.sub,
  });

  if(!userProfile?.availableTokens){
    res.status(401);
    return;
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { topic, keywords } = req.body;

  const openai = new OpenAIApi(config);

  if(!topic || !keywords){
    res.status(422);
    return;
  }

  if(topic.length > 110 || keywords.length > 110){
    res.status(422);
    return;
  }

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


  await db.collection("users").updateOne({
    auth0Id: user.sub,
  }, {
    $inc: {
      availableTokens: -2
    } 
  });

  const parsed = {
    postContent,
    title,
    metaDescription,
  };

  const post = await db.collection("posts").insertOne({
    postContent: parsed?.postContent,
    title: parsed?.title,
    metaDescription: parsed?.metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date()
  });

  console.log('POST: ',post);

  // Add code to send the response back to the client
  res.status(200).json({
    postId: post.insertedId,
  });
}
)