"use client"
import React from "react";
import { Client, Entry } from 'contensis-delivery-api';
import Link from "next/link";
import Pill from "@/components/pill/pill";

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


const [events, setEvents] = React.useState<Entry[]>([]);

  React.useEffect(() => {
    const client = Client.create({
      rootUrl: 'https://live-zenhub.cloud.contensis.com',
      accessToken: 'sNF3SnNWu6RMAtpzybcOqkHKUlMnEUwrNre0OlD9G8UERroN',
      projectId: 'contensis',
      language: 'en-GB',
      versionStatus: 'latest',
      pageSize: 9
    });
    


    client.entries.list({
      contentTypeId: 'event',
      pageOptions: { pageIndex: 0, pageSize: 9 },
      order: ['-eventDate']
    }).then(events => {
      if (events?.items) setEvents(events?.items);
    });
  }, []);


  const [grouped, setGrouped] = React.useState({ live: [] as Entry[], upcoming: [] as Entry[], passed: [] as Entry[] })
  React.useEffect(() => {
    const nowDate = new Date();
    const nowDateString = nowDate.toDateString();

    const groups: any = { live: [] as Entry[], upcoming: [] as Entry[], passed: [] as Entry[] }
    if (events?.length >= 1) {

    events?.forEach((event: Entry) => {
      const evtStart = new Date(event?.eventDate.from).toDateString();
      const evtEnd = new Date(event?.eventDate.to).toDateString();
  
      let evtStatus;
      if (nowDateString === evtStart) {
        evtStatus = "live";
      } else if (nowDate >= new Date(event?.eventDate.from) && nowDate <= new Date(event?.eventDate.to)) {
        evtStatus = "live";
      } else if (nowDate < new Date(event?.eventDate.from)) {
        evtStatus = "upcoming";
      } else {
        evtStatus = "passed";
      }
  
      groups[evtStatus].push(event);
    });
  }

    setGrouped(groups)

  }, [events])



  return (
    <div className="min-h-screen bg-[var(--semantic-background-primary)] text-[var(--semantic-type-primary)] px-4">
      <h1 className="py-[80px] text-4xl md:text-7xl font-bold text-center">Events</h1>
      <div>
        <div className="flex flex-col items-start justify-start w-full max-w-[1000px] mx-auto">
          {Object.keys(grouped)?.map((key: any) => {
            return (
              <div key={key} className="my-8 w-full">
              <h1 className="text-3xl md:text-5xl font-bold capitalize mb-4">{key} Events</h1>
              <ul className="flex flex-col gap-4 w-full">
                {((grouped as any)[key] ).map((groupedEvt: Entry) => {
                  // if (!groupedEvt?.sys?.uri) return null;
                    return (
                      <EventCard   
                        key={groupedEvt?.sys?.id} 
                        title={groupedEvt?.entryTitle}
                        text={groupedEvt?.entryDescription}
                        id={groupedEvt?.sys?.id}
                        status={key}
                      />
                    )
                })}
              </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

const EventCard = ({ title, text, id, status }: any) => {
  return (
      <li className="flex flex-col items-start justify-start w-full gap-4 border-y-[1px] border-[var(--semantic-border-primary)] py-6 my-6">
      <Pill status={status} />
      <h2 className="text-2xl">{title}</h2>
      {text && <p>{text}</p>}
      <Link href={`/events/${id}`} className="py-2 px-6 bg-[var(--semantic-action-prority-primary-background)] hover:bg-[var(--semantic-action-prority-primary-hover)] text-[var(--semantic-action-prority-primary-text)] rounded-[0.25rem] focus:outline-none self-start">View</Link>
    </li>
  )
}
