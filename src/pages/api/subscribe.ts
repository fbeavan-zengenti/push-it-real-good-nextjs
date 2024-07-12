import { appConfig } from "@/app/app.config";
import { getNewRandomnZenEventNotification } from "@/utils/getNewEventNotification";
import type { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const subscription = await req.body;
    setInterval(async () => {
      if (appConfig?.zenEventNotifications?.length) {
        for (const zenEventNotification of appConfig.zenEventNotifications) {
          try {
            const payload = JSON.stringify(zenEventNotification);
            await webPush.sendNotification(subscription, payload);
          } catch (error) {
            console.error(JSON.stringify(error));
          }
        }
      } else {
        try {
          const zenEventNotification = getNewRandomnZenEventNotification();
          const payload = JSON.stringify(zenEventNotification);
          await webPush.sendNotification(subscription, payload);
        } catch (error) {
          console.error(JSON.stringify(error));
        }
      }
    }, 10000);
    res.status(200).json({});
    console.info(JSON.stringify(subscription));
  }
}
