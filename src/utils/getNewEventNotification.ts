import { appConfig } from "@/app/app.config";
import { NOUN_LIST } from "./noun-list";

export const getNewRandomnZenEventNotification = () => {
  const word1 = NOUN_LIST[Math.floor(Math.random() * NOUN_LIST.length)];
  const word2 = NOUN_LIST[Math.floor(Math.random() * NOUN_LIST.length)];
  const word3 = NOUN_LIST[Math.floor(Math.random() * NOUN_LIST.length)];
  appConfig.zenTempIdCounter += 1;

  const zenEventNotification: ZenEventNotification = {
    id: appConfig.zenTempIdCounter.toString(),
    title: "I speaketh now listen!",
    instruction: `Behind the ${word1} is a ${word2}. Sit on the ${word3}`,
  };
  return zenEventNotification;
};
