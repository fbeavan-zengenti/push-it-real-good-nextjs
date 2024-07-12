import React from 'react';
import { Client, Entry } from 'contensis-delivery-api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';


const Event = () => {

  const router = useRouter()
  const { id } = router.query as { id: string }
  const [entry, setEntry] = React.useState<Entry>();

  
    React.useEffect(() => {
        const client = Client.create({
          rootUrl: 'https://live-zenhub.cloud.contensis.com',
          accessToken: 'sNF3SnNWu6RMAtpzybcOqkHKUlMnEUwrNre0OlD9G8UERroN',
          projectId: 'contensis',
          language: 'en-GB',
          versionStatus: 'latest',
          pageSize: 9
        });

        client.entries.get(id).then(entry => setEntry(entry));
      }, [id]);
    

      console.log({ entry })
      
    const imgHost = 'https://www.contensis.com';
    const imgPath = entry?.logo?.asset?.sys?.uri;

    console.log(`${imgHost}${imgPath}`)

    const nowDate = new Date();
    return (
      <div>
        <Link href="/">Go back</Link>
        <div className='text-center flex flex-col gap-4 py-4 w-full max-w-[1000px] mx-auto'> 
        {entry?.logo?.asset?.sys?.uri && (
          <Image src={`${imgHost}${imgPath}`}  alt="" width={1000} height={200} />
          )}
          <h1 className='text-7xl'>{entry?.entryTitle}</h1>
          {entry?.entryDescription && (
            <div dangerouslySetInnerHTML={{ __html: entry?.entryDescription }} />
          )}
        </div>
      </div>
    )
}

export default Event;