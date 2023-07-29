import Head from 'next/head'
import { Inter } from 'next/font/google'
import LandingPage from '@/components/LandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>D'Bocados Cake Shop</title>
        <meta name="description" content="D'Bocados Cake Shop web site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPage />
      </main>
    </>
  )
}
