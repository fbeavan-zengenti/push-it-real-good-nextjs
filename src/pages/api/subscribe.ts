import type { NextApiRequest, NextApiResponse } from 'next'
import { NOUN_LIST } from "@/utils/noun-list";
import webPush from 'web-push';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const subscription = await req.body;

    setInterval(() => {
        const word1 = NOUN_LIST[Math.floor(Math.random() * NOUN_LIST.length)];
        const word2 = NOUN_LIST[Math.floor(Math.random() * NOUN_LIST.length)];
        const word3 = NOUN_LIST[Math.floor(Math.random() * NOUN_LIST.length)];
        const payload = JSON.stringify({
        title: "I speaketh now listen!",
        instruction: `Behind the ${word1} is a ${word2}. Sit on the ${word3}`,
        });
        webPush.sendNotification(subscription, payload).catch((error) => {
        console.error(error.stack);
        });
    }, 10000);

    res.status(200).json({})
    console.info(JSON.stringify(subscription));
  } 
}