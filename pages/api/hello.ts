// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type Data = {
  answer: string;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function ask(content: string, model = 'gpt-3.5-turbo-0301') {
  const response = await openai.createChatCompletion({
    model: model,
    messages: [
      { role: 'system', content: '関西弁で話して' },
      { role: 'user', content: content },
    ],
  });

  const answer = response.data.choices[0].message?.content;
  return answer;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const question = req.query.q as string;
  const answer = await ask(question);
  res.status(200).json({ answer: answer || '' });
}
