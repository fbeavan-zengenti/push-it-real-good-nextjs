type GlobalExportsModel = {
  title: string;
  zenEventNotifications: ZenEventNotification[];
  zenTempIdCounter: number;
};
export const appConfig: GlobalExportsModel = {
  title: "Global Configuration Demo",
  zenEventNotifications: [],
  zenTempIdCounter: 0,
};
