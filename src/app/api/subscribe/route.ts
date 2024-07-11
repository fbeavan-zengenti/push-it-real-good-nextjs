import { NOUN_LIST } from "@/utils/noun-list";
import webPush from "web-push";

// PUBLIC_VAPID_KEY="BOgbgF6VGoAG5LvcbhCp5MCPM2Pxjtf9iqEUfkHG7J54kGWrJHNDTJnJ2rHDJKpCgpQhhyffqosUoF6zPCJcVvI"
// PRIVATE_VAPID_KEY="ygmmuyrZ3-pXcqPDyEw-V7jZY5YWQw0mFpTPKvxqGyo"

export async function POST(req: Request, res: Response) {
    const subscription = await req.json();

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

    console.info(JSON.stringify(subscription));

    return new Response("OK")

    // const body = await req.json();
    // console.log(body)
    // return new Response("OK")
}