// Next.js API route support: https://nextjs.org/docs/api-routes/introduction 

import { Configuration,OpenAIApi } from "openai";

export default async function handler(req, res) {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.5,
        max_token : 3600,
        prompt: "Generate a blog about she sitting in front of me in tution "

    });

    console.log("response",response);

    res.status(200).json({ name: 'Hello how low' })
  }
  