import React from 'react';
import { Client, Entry } from 'contensis-delivery-api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Pill from '@/components/pill/pill';


const Event = () => {

  const router = useRouter()
  const { id } = router.query as { id: string }
  const [entry, setEntry] = React.useState<Entry>();
  const [status, setStatus] = React.useState<string>();

  React.useEffect(() => {

    const nowDate = new Date();
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
  }, [entry])

  
    React.useEffect(() => {
        const client = Client.create({
          rootUrl: 'https://live-zenhub.cloud.contensis.com',
          accessToken: 'sNF3SnNWu6RMAtpzybcOqkHKUlMnEUwrNre0OlD9G8UERroN',
          projectId: 'contensis',
          language: 'en-GB',
          versionStatus: 'latest',
          pageSize: 9
        });

        client.entries.get({ id, linkDepth: 2 }).then(entry => setEntry(entry));
      }, [id]);
    

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
      const currentDate = new Date();
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
      <div className='min-h-screen bg-[var(--semantic-background-primary)] text-[var(--semantic-type-primary)]'>
        <Link className='text-[var(--semantic-type-secondary)] text-lg underline hover:no-underline flex flex-row items-center gap-2 py-[40px] px-[24px]' href="/">
        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Back to all events
        </Link>
      <div className='px-4 pt-[60px] pb-[120px]'>
  
        <div className='text-center flex flex-col gap-4 py-4 w-full max-w-[1000px] mx-auto'> 
        {imgPath && (
          <Image src={`${imgHost}${imgPath}`}  alt="" width={1000} height={200} />
          )}
          <h1 className='text-5xl md:text-7xl font-bold'>{entry?.entryTitle}</h1>
          {entry?.entryDescription && (
            <div dangerouslySetInnerHTML={{ __html: entry?.entryDescription }} />
          )}
          {status==='live' && (
            <>
            <Link href="#" className="py-2 px-6 bg-[var(--semantic-action-prority-primary-background)] hover:bg-[var(--semantic-action-prority-primary-hover)] text-[var(--semantic-action-prority-primary-text)] rounded-[0.25rem] focus:outline-none self-center">Subscribe</Link>
            <div className='flex flex-col gap-[40px] mt-[120px] mb-[60px] m:my-[120px]'>
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
                  <span>{formatDateAndTime(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to)}</span>
                  {isNow(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to) && (
                    <>
                    <Pill status="live" />
                  -
                  </>
                    )}
                  <h2 className='text-2xl font-bold'>{agendaSlotItem?.entryTitle}</h2> 
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
                  
                  <span>{formatDateAndTime(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to)}</span>
                  <div className='flex flex-row items-center gap-2'>
                    {isNow(agendaSlotItem?.dateAndTime?.from, agendaSlotItem?.dateAndTime?.to) && (
                      <>
                    <Pill status="live" />
                  -
                      </>
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
            <div className='grid gap-[80px] grid-cols-1 md:grid-cols-2 my-[60px] md:my-[120px]'>
              <div className='text-left flex flex-col gap-[40px]'>
              <h2 className='text-2xl'>Sign up for free</h2>
              <p>Utilise our software to audit your content. Highlight all the areas of your website that are underperforming, with detailed reports for accessibility, SEO and performance. Take a deep dive into your content and get useful insights with Insytful.</p>
              </div>
              <form className='flex flex-col items-start gap-4'>
                <div className='flex flex-col items-start gap-[8px] w-full'>
                <label htmlFor="name">Name (Required)</label>
                <input className="border w-full p-2 rounded" type="text" id="name" name="name"/>
                </div>
                <div className='flex flex-col items-start gap-[8px] w-full'>
                <label htmlFor="email">Email: (Required)</label>
                <input className="border w-full p-2 rounded" type="email" id="email" name="email"/>
                </div>
                <button type="button" className="py-2 px-6 bg-[var(--semantic-action-prority-primary-background)] hover:bg-[var(--semantic-action-prority-primary-hover)] text-[var(--semantic-action-prority-primary-text)] rounded-[0.25rem] focus:outline-none self-start">Sign up</button>
              </form>
            </div>
          )}
        </div>
      </div>
      </div>
    )
}

export default Event;