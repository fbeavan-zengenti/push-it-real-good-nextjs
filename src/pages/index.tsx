"use client"
import React from "react";

const Home = () => {

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
        console.log('Found "ServiceWorker" in Navigator');

        navigator.serviceWorker
        .register('/service-worker/worker.js')
        .then((registration) => {
            console.log("Successfully Registered");

            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "BOgbgF6VGoAG5LvcbhCp5MCPM2Pxjtf9iqEUfkHG7J54kGWrJHNDTJnJ2rHDJKpCgpQhhyffqosUoF6zPCJcVvI",
            }).then(async (subscription) => {
                console.log("Successfully Subscribed");

                await fetch('/api/subscribe', {
                    method: "POST",
                    body: JSON.stringify(subscription),
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
            });
        });
    }
}, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--semantic-background-primary)] text-[var(--semantic-type-primary)] px-4">
      <div className="max-w-[600px] w-full p-8 bg-[var(--semantic-background-secondary)] rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-semibold ml-4">Lockdown 2024</h1>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <p>🔔 Subscribe to Notifications Now 🔔</p>
            <button
            type="button"
            // onClick={doSubscribe}
            className="py-2 px-6 bg-[var(--semantic-action-prority-background)] hover:bg-[var(--semantic-action-prority-hover)] text-[var(--semantic-action-prority-text)] rounded-[0.25rem] focus:outline-none self-center"
          >
            Subscribe
          </button>
            {/* <label htmlFor="email"  className="text-s text-left">Enter your email to subscribe</label>
            <input
              className="py-2 px-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400 flex-1"
              placeholder="Enter your email" type="email" name="email" id="email"
              /> */}
            </div>
          {/* */}
        </div>
      </div>
    </div>
  );
};

export default Home;
