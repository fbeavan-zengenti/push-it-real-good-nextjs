import Layout from "@/components/main.layout";
import { AppProps } from "next/app";

import { Poppins } from 'next/font/google'
const poppins = Poppins({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <main className={poppins.className}>
      <Component {...pageProps} />
      </main>
    </Layout>
  )
}