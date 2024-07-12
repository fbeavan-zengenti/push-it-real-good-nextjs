"use client"
import React from "react";
import Link from "next/link";
import Pill from "@/components/pill/pill";
import DateSelector from "@/components/dateSelector/dateSelector";
import Image from "next/image";
import eventEntry from '@/data/event.json'

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



const entry = eventEntry;

const [status, setStatus] = React.useState<string>();

const today = new Date();
const formattedToday = today.toISOString().split('T')[0];
const [date, setDate] = React.useState<string>(formattedToday);

React.useEffect(() => {

  const nowDate = new Date(date);
  const nowDateString = nowDate.toDateString();

  const evtStart = new Date(entry?.eventDate.from).toDateString();
  const evtEnd = new Date(entry?.eventDate.to).toDateString();

  let evtStatus;
  if (nowDateString === evtStart) {
    evtStatus = "live";
  } else if (nowDate >= new Date(entry?.eventDate.from) && nowDate <= new Date(entry?.eventDate.to)) {
    evtStatus = "live";
  } else if (nowDate < new Date(entry?.eventDate.from)) {
    evtStatus = "upcoming";
  } else {
    evtStatus = "passed";
  }


  setStatus(evtStatus);
}, [entry, date])


  const imgHost = 'https://www.contensis.com';
  const imgPath = entry?.logo?.asset?.sys?.uri;

  function formatDateAndTime(from:string, to:string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
  
    const options = { hour: '2-digit', minute: '2-digit' } as any;
  
    const fromTimeString = fromDate.toLocaleTimeString('en-GB', options);
    const toTimeString = toDate.toLocaleTimeString('en-GB', options);
  
    return `${fromTimeString}–${toTimeString}`;
  }
  
  
  const isNow = (from:string, to:string) => {

    const currentDate = new Date(date as string);
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const fromHours = new Date(from).getHours();
    const fromMinutes = new Date(from).getMinutes();

    const toHours = new Date(to).getHours();
    const toMinutes = new Date(to).getMinutes();

    const isAfterFrom = currentHours > fromHours || (currentHours === fromHours && currentMinutes >= fromMinutes);
    const isBeforeTo = currentHours < toHours || (currentHours === toHours && currentMinutes < toMinutes);

    return isAfterFrom && isBeforeTo;
  };


  return (
    <div className='min-h-screen bg-[var(--semantic-background-primary)] text-[var(--semantic-type-primary)] py-[80px]'>
      <div className='flex flex-col w-full max-w-[320px] gap-[8px] mx-auto'>
        <DateSelector  today={today} setDate={setDate} date={date} />
      </div>

    <div className='px-4 pt-[60px] pb-[120px]'>

      <div className='text-center flex flex-col gap-4 py-4 w-full max-w-[1520px] mx-auto'> 
      {imgPath && (
        <Image src={`${imgHost}${imgPath}`}  alt="" width={1000} height={200}  className='w-full max-w-[1000px] mx-auto h-[200px] object-contain mb-[24px]'/>
        )}
        <h1 className='text-5xl md:text-7xl font-bold w-full max-w-[1000px] mx-auto'>{entry?.entryTitle}</h1>
        {entry?.entryDescription && (
          <div className='w-full max-w-[1000px] mx-auto' dangerouslySetInnerHTML={{ __html: entry?.entryDescription }} />
        )}
        {status==='live' && (
          <>
          <Link href="#" className="py-2 px-6 bg-[var(--semantic-action-prority-primary-background)] hover:bg-[var(--semantic-action-prority-primary-hover)] text-[var(--semantic-action-prority-primary-text)] rounded-[0.25rem] focus:outline-none self-center">Subscribe</Link>
          <div className='flex flex-col gap-[40px] mt-[120px] mb-[60px] m:my-[120px] w-full max-w-[1000px] mx-auto'>
          {entry?.agendaSlot?.map((agendaSlotItem:any, i:number) => {
            console.log(isNow(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to) )
            const agendaSlotItemImagePage = agendaSlotItem?.entryThumbnail?.asset?.sys?.uri;
            if (agendaSlotItemImagePage) {
              return (
                <>
                <div key={i} className='flex flex-col md:flex-row gap-[40px] items-center'>
                {agendaSlotItemImagePage && (
                  <Image src={`${imgHost}${agendaSlotItemImagePage}`}  alt="" width={350} height={350} />
                )}
                <div className='flex flex-col gap-[24px] text-left'>
                <span className='text-2xl	text-[var(--semantic-type-secondary)]'>{formatDateAndTime(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to)}</span>
                <div className='flex flex-col items-start gap-2'>
                {isNow(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to) && (
                  <><Pill status="live" /></>
                  )}
                <h2 className='text-2xl font-bold'>{agendaSlotItem?.entryTitle}</h2> 
                </div>
                <p>{agendaSlotItem?.entryDescription}</p>
                </div>
              </div>
              </>
              )
            } else {
              return (
                <>
                <div key={i} className='flex flex-col justify-center md:flex-row gap-[40px] items-center py-[40px] border-y-[1px] border-[var(--semantic-border-primary)]'>
                <div className='flex flex-col justify-center items-center gap-[24px] text-center'>
                
                <span className='text-2xl	text-[var(--semantic-type-secondary)]'>{formatDateAndTime(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to)}</span>
                <div className='flex flex-row items-center gap-2'>
                  {isNow(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to) && (
                    <><Pill status="live" /> -</>
                  )}
                  <h2 className='text-2xl font-bold'>{agendaSlotItem?.entryTitle}</h2> 
                </div>
                </div>
              </div>
              </>
              )
            }
          })}
          </div>
          </>
        )}
        {status === 'upcoming' && (
          <div className='grid gap-[80px] grid-cols-1 md:grid-cols-2 my-[60px] md:my-[120px] w-full max-w-[1200px] mx-auto'>
            <div className='text-left flex flex-col gap-[40px]'>
            <h2 className='text-2xl'>Sign up for free</h2>
            <p>Utilise our software to audit your content. Highlight all the areas of your website that are underperforming, with detailed reports for accessibility, SEO and performance. Take a deep dive into your content and get useful insights with Insytful.</p>
            </div>
            <form className='flex flex-col items-start gap-[24px]'>
              <div className='flex flex-col items-start gap-[8px] w-full'>
              <label htmlFor="name">Name (Required)</label>
              <input className="bg-[var(--semantic-background-secondary)] border w-full p-2 rounded" type="text" id="name" name="name"/>
              </div>
              <div className='flex flex-col items-start gap-[8px] w-full'>
              <label htmlFor="email">Organisation: (Required)</label>
              <input className="bg-[var(--semantic-background-secondary)] border w-full p-2 rounded" type="email" id="email" name="email"/>
              </div>
              <div className='flex flex-col items-start gap-[8px] w-full'>
              <label htmlFor="email">Email: (Required)</label>
              <input className="bg-[var(--semantic-background-secondary)] border w-full p-2 rounded" type="email" id="email" name="email"/>
              </div>
              <button type="button" className="mt-3 py-2 px-6 bg-[var(--semantic-action-prority-primary-background)] hover:bg-[var(--semantic-action-prority-primary-hover)] text-[var(--semantic-action-prority-primary-text)] rounded-[0.25rem] focus:outline-none self-start">Sign up</button>
            </form>
          </div>
        )}
        {status === 'passed' && (
          <>
          {entry?.composer?.map((composerItem: any) => {

            switch(composerItem?.type) {
              case "imageGallery": {
                const images = composerItem?.value;
                return (
                  <div className='mt-[40px] grid gap-[16px] md:gap-[40px] grid-cols-3 '>
                    {images?.map((image: any, i:number) => {
                      return (
                        <Image 
                          key={i} 
                          alt=""  
                          src={`${imgHost}${image?.asset?.sys?.uri}`} height={480} width={480} 
                        />
                      )
                    })}
                  </div>
                )
              }

              default:
                return <></>
            }
          })}
          </>
        )}
      </div>
    </div>
    </div>
  )
};

export default Home;

