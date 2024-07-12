import { appConfig } from "./app/app.config";
import { getNewRandomnZenEventNotification } from "./utils/getNewEventNotification";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.info(`hit instrumentation register`);
    //   await import('./instrumentation-node')
    appConfig.zenEventNotifications.push(getNewRandomnZenEventNotification());
    appConfig.zenTempIdCounter = 1;
    setInterval(() => {}, 20000);
  }
  if (process.env.NEXT_RUNTIME === "edge") {
  }
}
