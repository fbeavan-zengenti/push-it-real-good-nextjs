console.log("Loaded service worker!");

self.addEventListener("push", (ev) => {
  const data = ev.data?.json ? ev.data.json() : null;
  if (data) {
    console.log("Got push", data);
    self.registration.showNotification(data.title, {
      body: data.instruction ?? "",
      icon: "http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png",
    });
  }
});